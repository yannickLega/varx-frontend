import React, { useState } from "react"

import CheckoutNavigation from "../CheckoutNavigation"
import Details from "../../settings/Details"
import Location from "../../settings/Location"
import Shipping from "../Shipping"
import Payments from "../../settings/Payments"
import Confirmation from "../Confirmation"

import { Grid } from "@material-ui/core"

import CheckoutPortalStyles from "./CheckoutPortalStyles"

export default function CheckoutPortal({ user }) {
  const classes = CheckoutPortalStyles()
  const [selectedStep, setSelectedStep] = useState(0)
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [detailBilling, setDetailBilling] = useState(false)
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [locationBilling, setLocationBilling] = useState(false)
  const [billingSlot, setBillingSlot] = useState(0)
  const [saveCard, setSaveCard] = useState(false)

  const [errors, setErrors] = useState({})
  const [selectedShipping, setSelectedShipping] = useState(null)
  const shippingOptions = [
    { label: "FREE SHIPPING", price: 0 },
    { label: "2-DAY SHIPPING", price: 9.99 },
    { label: "OVERNIGHT SHIPPING", price: 29.99 },
  ]

  const steps = [
    {
      title: "Contact",
      component: (
        <Details
          user={user}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          billing={detailBilling}
          setBilling={setDetailBilling}
          errors={errors}
          setErrors={setErrors}
          checkout
        />
      ),
    },
    {
      title: "Address",
      component: (
        <Location
          user={user}
          values={locationValues}
          setValues={setLocationValues}
          slot={locationSlot}
          setSlot={setLocationSlot}
          billing={locationBilling}
          setBilling={setLocationBilling}
          errors={errors}
          setErrors={setErrors}
          checkout
        />
      ),
    },
    {
      title: "Shipping",
      component: (
        <Shipping
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
        />
      ),
    },
    {
      title: "Payment",
      component: (
        <Payments
          user={user}
          slot={billingSlot}
          setSlot={setBillingSlot}
          saveCard={saveCard}
          setSaveCard={setSaveCard}
          checkout
        />
      ),
    },
    { title: "Confirmation", component: <Confirmation /> },
    { title: `Thanks, ${user.username}!` },
  ]

  return (
    <Grid item container direction="column" xs={6} alignItems="flex-end">
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.stepContainer }}
      >
        {steps[selectedStep].component}
      </Grid>
    </Grid>
  )
}
