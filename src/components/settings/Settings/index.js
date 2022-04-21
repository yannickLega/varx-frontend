import React, { useContext, useState, useEffect } from "react"
import clsx from "clsx"

import { UserContext } from "../../../contexts"

import Details from "../Details"
import Payments from "../Payments"
import Location from "../Location"
import Edit from "../Edit"

import { Grid } from "@material-ui/core"

import SettingsStyles from "./SettingsStyles"

export default function Settings({ setSelectedSetting }) {
  const classes = SettingsStyles()
  const { user, dispatchUser } = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  const [changesMade, setChangesMade] = useState(false)
  const [detailSlot, setDetailSlot] = useState(0)
  const [detailErrors, setDetailErrors] = useState({})
  const [detailValues, setDetailValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "********",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [locationErrors, setLocationErrors] = useState({})
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })

  const allErrors = { ...detailErrors, ...locationErrors }
  const isError = Object.keys(allErrors).some(
    error => allErrors[error] === true
  )

  useEffect(() => {
    setDetailErrors({})
  }, [detailSlot])

  useEffect(() => {
    setLocationErrors({})
  }, [locationSlot])

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          errors={detailErrors}
          setErrors={setDetailErrors}
        />
        <Payments user={user} edit={edit} />
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={locationValues}
          setValues={setLocationValues}
          slot={locationSlot}
          setSlot={setLocationSlot}
          errors={locationErrors}
          setErrors={setLocationErrors}
        />
        <Edit
          user={user}
          dispatchUser={dispatchUser}
          setSelectedSetting={setSelectedSetting}
          edit={edit}
          setEdit={setEdit}
          changesMade={changesMade}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
          isError={isError}
        />
      </Grid>
    </>
  )
}
