import {makeObjectModification} from "@lightningkite/lightning-server-simplified"
import {
  makeFormikAutocompleteProps,
  makeFormikDatePickerProps,
  makeFormikTextFieldProps,
  RestAutocompleteInput
} from "@lightningkite/mui-lightning-components"
import {dayjsToISO, dayjsFromISO} from "@lightningkite/react-lightning-helpers"
import {Stack, TextField} from "@mui/material"
import {DatePicker} from "@mui/x-date-pickers"
import type {Project, Task, TimeEntry} from "api/sdk"
import {TaskState} from "api/sdk"
import DialogForm, {shouldPreventSubmission} from "components/DialogForm"
import Loading from "components/Loading"
import type {Dayjs} from "dayjs"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import {useFormik} from "formik"
import type {FC} from "react"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "utils/context"
import {stringToDuration} from "utils/helpers"
import * as yup from "yup"

dayjs.extend(duration)

export interface TimeEntryModalProps {
  timeEntry: TimeEntry | null
  onClose: () => void
}
const validationSchema = yup.object().shape({
  summary: yup.string().required("Required"),
  date: yup.date().required("Required"),
  durationMilliseconds: yup
    .string()
    .required("Required")
    .test(
      "is-valid-duration",
      "Invalid duration",
      (value) => value !== undefined && stringToDuration(value) !== null
    )
})

export const TimeEntryModal: FC<TimeEntryModalProps> = (props) => {
  const {timeEntry, onClose} = props
  const {session} = useContext(AuthContext)

  const [loadedInitialAsyncValues, setLoadedInitialAsyncValues] =
    useState(false)

  const formik = useFormik({
    initialValues: {
      task: null as Task | null,
      project: null as Project | null,
      summary: "",
      durationMilliseconds: "",
      date: null as Dayjs | null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formattedValues: Partial<TimeEntry> = {
        ...values,
        task: values.task?._id,
        project: values.project?._id,
        durationMilliseconds: stringToDuration(
          values.durationMilliseconds
        )!.asMilliseconds(),
        date: dayjsToISO(values.date!)
      }

      const modification = makeObjectModification(timeEntry, formattedValues)

      if (!modification) return
      await session.timeEntry.modify(timeEntry!._id, modification)

      onClose()
    }
  })

  useEffect(() => {
    formik.values.project?._id !== formik.values.task?.project &&
      formik.setFieldValue("task", null)
  }, [formik.values.project])

  useEffect(() => {
    setLoadedInitialAsyncValues(false)
    if (!timeEntry) return

    Promise.all([
      timeEntry.project && session.project.detail(timeEntry.project),
      timeEntry.task && session.task.detail(timeEntry.task)
    ])
      .then(([project, task]) => {
        formik.setValues({
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          project: project || null,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          task: task || null,
          summary: timeEntry.summary,
          durationMilliseconds: dayjs
            .duration(timeEntry.durationMilliseconds, "milliseconds")
            .format("HH:mm:ss"),
          date: dayjsFromISO(timeEntry.date)
        })
        setLoadedInitialAsyncValues(true)
      })
      .catch(() => alert("Error loading data"))
  }, [timeEntry])

  return (
    <DialogForm
      title="Time Entry"
      onClose={onClose}
      onSubmit={async () => {
        await formik.submitForm()
        if (shouldPreventSubmission(formik)) {
          throw new Error("Please fix the errors above.")
        }
      }}
      onDelete={() => session.timeEntry.delete(timeEntry!._id)}
      open={!!timeEntry}
      disableSubmitBtn={!loadedInitialAsyncValues || !formik.dirty}
    >
      {!loadedInitialAsyncValues ? (
        <Loading />
      ) : (
        <Stack gap={3}>
          <RestAutocompleteInput
            label="Project"
            restEndpoint={session.project}
            getOptionLabel={(project) => project.name}
            searchProperties={["name"]}
            {...makeFormikAutocompleteProps(formik, "project")}
          />

          <RestAutocompleteInput
            label="Task"
            restEndpoint={session.task}
            getOptionLabel={(task) => task.summary}
            searchProperties={["summary"]}
            disabled={!formik.values.project}
            dependencies={[formik.values.project]}
            additionalQueryConditions={[
              formik.values.project
                ? {project: {Equal: formik.values.project._id}}
                : {Never: true},
              {state: {NotEqual: TaskState.Delivered}}
            ]}
            {...makeFormikAutocompleteProps(formik, "task")}
          />

          <DatePicker
            label="Date"
            {...makeFormikDatePickerProps(formik, "date")}
            maxDate={dayjs()}
          />

          <TextField
            label="Duration"
            placeholder="hh:mm:ss"
            {...makeFormikTextFieldProps(formik, "durationMilliseconds")}
          />

          <TextField
            label="Summary"
            multiline
            {...makeFormikTextFieldProps(formik, "summary")}
          />
        </Stack>
      )}
    </DialogForm>
  )
}
