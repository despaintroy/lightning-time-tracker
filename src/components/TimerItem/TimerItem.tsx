import {HoverHelp, useThrottle} from "@lightningkite/mui-lightning-components"
import {DeleteOutline, Pause, PlayArrow, UnfoldLess} from "@mui/icons-material"
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  useTheme
} from "@mui/material"
import {Project, Task, TaskState} from "api/sdk"
import {AutoLoadingButton} from "components/AutoLoadingButton"
import React, {FC, useContext, useEffect, useMemo, useState} from "react"
import {AuthContext, TimerContext} from "utils/context"
import {ContentCollapsed} from "./ContentCollapsed"
import HmsInputGroup from "./hmsInputGroup"

export interface TimerItemProps {
  timerKey: string
  projectOptions: Project[] | undefined
}

export const TimerItem: FC<TimerItemProps> = ({timerKey, projectOptions}) => {
  const {session, currentUser} = useContext(AuthContext)
  const {timers, removeTimer, submitTimer, updateTimer, toggleTimer} =
    useContext(TimerContext)
  const theme = useTheme()

  const timer = timers[timerKey]

  const [summary, setSummary] = useState(timer.summary)
  const [expanded, setExpanded] = useState(!timer.project || !timer.task)
  const [sortedTaskOptions, setSortedTaskOptions] = useState<Task[]>()
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false)

  const throttledSummary = useThrottle(summary, 1000)

  const sortedProjects = useMemo(() => {
    return projectOptions?.sort((p) =>
      currentUser.projectFavorites.includes(p._id) ? -1 : 1
    )
  }, [projectOptions])

  const projectsById = useMemo(() => {
    return new Map<string, Project>(projectOptions?.map((p) => [p._id, p]))
  }, [projectOptions])

  const tasksById = useMemo(() => {
    return new Map<string, Task>(sortedTaskOptions?.map((t) => [t._id, t]))
  }, [sortedTaskOptions])

  useEffect(() => {
    if (!timer.project) {
      setSortedTaskOptions([])
      return
    }

    setSortedTaskOptions(undefined)

    session.task
      .query({
        limit: 1000,
        condition: {
          And: [
            {project: {Equal: timer.project}},
            {state: {NotInside: [TaskState.Delivered, TaskState.Cancelled]}}
          ]
        }
      })
      .then((tasks) =>
        setSortedTaskOptions(
          tasks.sort((a, b) =>
            isMyActiveTask(a) ? -1 : isMyActiveTask(b) ? 1 : 0
          )
        )
      )
  }, [timer.project])

  useEffect(() => {
    updateTimer(timerKey, {summary: throttledSummary})
  }, [throttledSummary])

  useEffect(() => {
    const task = tasksById.get(timer.task ?? "")
    const project = projectsById.get(timer.project ?? "")

    if (!task || !project) return

    setExpanded(false)

    if (task?.project !== project?._id) updateTimer(timerKey, {task: undefined})
  }, [timer.task, timer.project])

  function isMyActiveTask(task: Task): boolean {
    return task.user === currentUser._id && task.state === TaskState.Active
  }

  function createTask(summary: string) {
    const project = timer.project && projectsById.get(timer.project)
    if (!project) return

    setIsCreatingNewTask(true)

    session.task
      .insert({
        _id: crypto.randomUUID(),
        project: project._id,
        projectName: project.name,
        organization: project.organization,
        organizationName: undefined,
        user: currentUser._id,
        userName: currentUser.name,
        state: TaskState.Active,
        summary,
        description: "",
        attachments: [],
        estimate: undefined,
        emergency: false,
        createdAt: new Date().toISOString(),
        createdBy: currentUser._id,
        creatorName: currentUser.name
      })
      .then((task) => {
        setSortedTaskOptions((tasks) => (tasks ? [task, ...tasks] : undefined))
        updateTimer(timerKey, {task: task._id})
      })
      .catch(console.error)
      .finally(() => setIsCreatingNewTask(false))
  }

  return (
    <Paper sx={{p: 1}}>
      {expanded ? (
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
          >
            <HmsInputGroup timerKey={timerKey} />

            {timer.project && (
              <HoverHelp description="Collapse">
                <IconButton onClick={() => setExpanded(false)}>
                  <UnfoldLess />
                </IconButton>
              </HoverHelp>
            )}

            <HoverHelp description="Delete timer">
              <IconButton
                onClick={() =>
                  confirm("Are you sure you want to delete this timer?") &&
                  removeTimer(timerKey)
                }
                sx={{
                  "&:hover": {
                    color: theme.palette.error.main
                  }
                }}
              >
                <DeleteOutline />
              </IconButton>
            </HoverHelp>
          </Stack>

          <Autocomplete
            options={sortedProjects ?? []}
            disabled={!sortedProjects}
            loading={!sortedProjects}
            value={projectsById.get(timer.project ?? "") ?? null}
            onChange={(e, value) => {
              updateTimer(timerKey, {project: value?._id, task: null})
            }}
            getOptionLabel={(project) => project.name}
            renderInput={(params) => <TextField {...params} label="Project" />}
            groupBy={(project) =>
              currentUser.projectFavorites.includes(project._id)
                ? "Favorites"
                : "All"
            }
          />

          <Autocomplete<Task | string, false, false, true>
            options={sortedTaskOptions ?? []}
            disabled={!sortedTaskOptions || !timer.project || isCreatingNewTask}
            loading={!sortedTaskOptions || isCreatingNewTask}
            value={timer.task}
            onChange={(e, value) =>
              typeof value === "string"
                ? createTask(value)
                : updateTimer(timerKey, {task: value?._id})
            }
            getOptionLabel={(task) =>
              typeof task === "string" ? `Create task "${task}"` : task.summary
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={isCreatingNewTask ? "Creating new task..." : "Task"}
                placeholder={isCreatingNewTask ? "Creating task..." : undefined}
              />
            )}
            groupBy={(task) => {
              return typeof task === "string"
                ? "New Task"
                : isMyActiveTask(task)
                ? "My Active Tasks"
                : "All Open"
            }}
            filterOptions={(options, {inputValue, getOptionLabel}) => {
              const filtered = options.filter((option) =>
                getOptionLabel(option)
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
              )

              const isExistingTask = filtered.some(
                (option) => getOptionLabel(option) === inputValue
              )

              if (inputValue !== "" && !isExistingTask) {
                filtered.push(inputValue)
              }

              return filtered
            }}
            freeSolo
            clearOnBlur
            selectOnFocus
          />
        </Stack>
      ) : (
        <Box sx={{cursor: "pointer"}} onClick={() => setExpanded(true)}>
          <ContentCollapsed
            task={tasksById.get(timer.task ?? "") ?? null}
            project={projectsById.get(timer.project ?? "") ?? null}
            timer={timer}
          />
        </Box>
      )}
      <TextField
        label="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        multiline
        sx={{my: 2}}
        fullWidth
      />
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Button
          variant={timer.lastStarted ? "contained" : "outlined"}
          onClick={() => toggleTimer(timerKey)}
          fullWidth
          sx={{maxWidth: 100}}
        >
          {timer.lastStarted ? <Pause /> : <PlayArrow />}
        </Button>
        <AutoLoadingButton
          onClick={() =>
            submitTimer(timerKey).catch((e) => alert("Error submitting timer"))
          }
          variant="contained"
          disabled={!timer.project || !summary}
          fullWidth
          sx={{maxWidth: 100}}
        >
          Submit
        </AutoLoadingButton>
      </Stack>
    </Paper>
  )
}
