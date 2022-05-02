import React, { useState, useEffect } from "react"

import validate from "../../ui/validate"

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
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [detailBillingSwitch, setDetailBillingSwitch] = useState(false)
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [billingLocation, setBillingLocation] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [locationBillingSwitch, setLocationBillingSwitch] = useState(false)
  const [billingSlot, setBillingSlot] = useState(0)
  const [saveCard, setSaveCard] = useState(false)

  const [errors, setErrors] = useState({})
  const [selectedShipping, setSelectedShipping] = useState(null)
  const shippingOptions = [
    { label: "FREE SHIPPING", price: 0 },
    { label: "2-DAY SHIPPING", price: 9.99 },
    { label: "OVERNIGHT SHIPPING", price: 29.99 },
  ]

  const errorHelper = values => {
    const valid = validate(values)

    return Object.keys(valid).some(value => !valid[value])
  }

  let steps = [
    {
      title: "Contact",
      component: (
        <Details
          user={user}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          billing={detailBillingSwitch}
          setBilling={setDetailBillingSwitch}
          errors={errors}
          setErrors={setErrors}
          checkout
        />
      ),
      error: errorHelper(detailValues),
    },
    {
      title: "Billing Info",
      component: (
        <Details
          values={billingDetails}
          setValues={setBillingDetails}
          errors={errors}
          setErrors={setErrors}
          checkout
          noSlots
        />
      ),
      error: errorHelper(billingDetails),
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
          billing={locationBillingSwitch}
          setBilling={setLocationBillingSwitch}
          errors={errors}
          setErrors={setErrors}
          checkout
        />
      ),
      error: errorHelper(locationValues),
    },
    {
      title: "Billing Address",
      component: (
        <Location
          values={billingLocation}
          setValues={setBillingLocation}
          errors={errors}
          setErrors={setErrors}
          checkout
          noSlots
        />
      ),
      error: errorHelper(billingLocation),
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
      error: selectedShipping === null,
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
      error: false,
    },
    {
      title: "Confirmation",
      component: (
        <Confirmation
          detailValues={detailValues}
          billingDetails={billingDetails}
          detailBillingSwitch={detailBillingSwitch}
          locationValues={locationValues}
          billingLocation={billingLocation}
          locationBillingSwitch={locationBillingSwitch}
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
        />
      ),
    },
    { title: `Thanks, ${user.username}!` },
  ]

  if (detailBillingSwitch) {
    steps = steps.filter(step => step.title !== "Billing Info")
  }

  if (locationBillingSwitch) {
    steps = steps.filter(step => step.title !== "Billing Address")
  }

  useEffect(() => {
    setErrors({})
  }, [detailSlot, locationSlot, selectedStep])

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
