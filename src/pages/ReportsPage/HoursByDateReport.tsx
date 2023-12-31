import {Aggregate} from "@lightningkite/lightning-server-simplified"
import {Alert, Card} from "@mui/material"
import type {GridColDef} from "@mui/x-data-grid"
import {DataGrid} from "@mui/x-data-grid"
import type {User} from "api/sdk"
import ErrorAlert from "components/ErrorAlert"
import type {FC} from "react"
import React, {useContext, useEffect, useState} from "react"
import {QUERY_LIMIT} from "utils/constants"
import {AuthContext} from "utils/context"
import {MILLISECONDS_PER_HOUR, makeUserTimeCondition} from "utils/helpers"
import {CustomToolbar} from "./CustomToolbar"
import {
  filtersToTimeEntryCondition,
  filtersToUserCondition
} from "./ReportFilters"
import type {ReportProps} from "./ReportsPage"

interface HoursTableRow {
  user: User
  dayMilliseconds: Record<string, number | null | undefined>
}

export const HoursByDateReport: FC<ReportProps> = (props) => {
  const {reportFilterValues} = props
  const {dateRange} = reportFilterValues
  const {session, currentOrganization} = useContext(AuthContext)

  const [tableData, setTableData] = useState<HoursTableRow[]>()
  const [users, setUsers] = useState<User[]>()
  const [error, setError] = useState("")

  async function fetchReportData() {
    setTableData(undefined)

    const users = await session.user.query({
      condition: {
        And: [
          filtersToUserCondition(reportFilterValues),
          makeUserTimeCondition({
            project: undefined,
            organization: currentOrganization._id
          })
        ]
      },
      limit: QUERY_LIMIT
    })

    setUsers(users)

    const userTimeRequests: Promise<HoursTableRow["dayMilliseconds"]>[] =
      users.map((user) =>
        session.timeEntry.groupAggregate({
          condition: {
            And: [
              {user: {Equal: user._id}},
              filtersToTimeEntryCondition(reportFilterValues)
            ]
          },
          aggregate: Aggregate.Sum,
          property: "durationMilliseconds",
          groupBy: "date"
        })
      )

    const userTimeResponses = await Promise.all(userTimeRequests)

    setTableData(
      userTimeResponses.map((dayMilliseconds, i) => ({
        user: users[i],
        dayMilliseconds
      }))
    )
  }

  useEffect(() => {
    fetchReportData().catch(() => setError("Error fetching report data"))
  }, [reportFilterValues])

  if (error) {
    return <ErrorAlert>{error}</ErrorAlert>
  }

  if (!dateRange) {
    return (
      <Alert severity="info">
        Select a date range to view the hours report.
      </Alert>
    )
  }

  return (
    <Card>
      <DataGrid
        autoHeight
        loading={!users || !tableData}
        disableRowSelectionOnClick
        disableColumnMenu
        columns={[
          {
            field: "user",
            headerName: "User",
            width: 200,
            valueGetter: ({row}) => row.user.name || row.user.email
          },
          {
            field: "total",
            headerName: "Total",
            width: 80,
            type: "number",
            valueGetter: ({row}) =>
              Object.values(row.dayMilliseconds).reduce<number>(
                (acc, milliseconds) => acc + (milliseconds ?? 0),
                0
              ),
            valueFormatter: ({value}) =>
              (value / MILLISECONDS_PER_HOUR).toFixed(1)
          },
          ...Array.from(
            {length: dateRange.end.diff(dateRange.start, "day") + 1},
            (_, i) => {
              const date = dateRange.start.add(i, "day")

              const column: GridColDef<HoursTableRow> = {
                field: date.format("YYYY-MM-DD"),
                headerName: date.format("MMM D"),
                minWidth: 80,
                flex: 1,
                type: "number",
                valueGetter: ({row}) =>
                  row.dayMilliseconds[date.format("YYYY-MM-DD")] ?? 0,
                valueFormatter: ({value}) =>
                  (value / MILLISECONDS_PER_HOUR).toFixed(1),
                renderCell: ({formattedValue, value}) =>
                  value === 0 ? "–" : formattedValue
              }

              return column
            }
          )
        ]}
        initialState={{
          sorting: {
            sortModel: [{field: "user", sort: "asc"}]
          }
        }}
        rows={tableData ?? []}
        getRowId={(r) => r.user._id}
        hideFooter
        components={{Toolbar: CustomToolbar}}
        componentsProps={{
          toolbar: {
            filters: reportFilterValues,
            filePrefix: "Hours by Date"
          }
        }}
        sx={{
          "& .MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
            outline: "none !important"
          }
        }}
      />
    </Card>
  )
}
