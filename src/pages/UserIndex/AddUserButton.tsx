import {
  makeFormikCheckboxProps,
  makeFormikTextFieldProps
} from "@lightningkite/mui-lightning-components"
import {Add} from "@mui/icons-material"
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField
} from "@mui/material"
import type {User} from "api/sdk"
import DialogForm, {shouldPreventSubmission} from "components/DialogForm"
import {useFormik} from "formik"
import type {FC} from "react"
import {useContext, useState} from "react"
import {AuthContext} from "utils/context"
import * as yup from "yup"

// Form validation schema. See: https://www.npmjs.com/package/yup#object
const validationSchema = yup.object().shape({
  email: yup.string().required("Required"),
  name: yup.string().required("Required")
})

export interface AddUserProps {
  afterSubmit: (newUser: User) => void
}

export const AddUserButton: FC<AddUserProps> = (props) => {
  const {session, currentUser} = useContext(AuthContext)

  const [showCreateForm, setShowCreateForm] = useState(false)

  function onClose() {
    setShowCreateForm(false)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      isSuperUser: false
    },
    validationSchema,
    onSubmit: async (values) => {
      const newUser = await session.user.insert({
        ...values,
        _id: crypto.randomUUID(),
        organization: currentUser.organization,
        currentTask: undefined,
        projectFavorites: [],
        webPreferences: "",
        limitToProjects: null,
        role: null,
        active: true
      })

      props.afterSubmit(newUser)
      onClose()
    }
  })

  return (
    <>
      <Button onClick={() => setShowCreateForm(true)} startIcon={<Add />}>
        Add User
      </Button>

      <DialogForm
        title="New User"
        open={showCreateForm}
        onClose={onClose}
        onSubmit={async () => {
          await formik.submitForm()
          if (shouldPreventSubmission(formik)) {
            throw new Error("Please fix the errors above.")
          }
        }}
      >
        <Stack gap={3}>
          <TextField
            label="Email"
            {...makeFormikTextFieldProps(formik, "email")}
          />
          <TextField
            label="Name"
            {...makeFormikTextFieldProps(formik, "name")}
          />

          {currentUser.isSuperUser && (
            <FormControlLabel
              control={
                <Checkbox {...makeFormikCheckboxProps(formik, "isSuperUser")} />
              }
              label="Is Super User"
            />
          )}
        </Stack>
      </DialogForm>
    </>
  )
}
