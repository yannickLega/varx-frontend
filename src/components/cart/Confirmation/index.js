import React, { useState, useContext } from "react"
import axios from "axios"
import clsx from "clsx"

import { CartContext, FeedbackContext } from "../../../contexts"
import { setSnackbar, clearCart } from "../../../contexts/actions"

import Fields from "../../auth/Fields"

import {
  Grid,
  Typography,
  Button,
  Chip,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core"

import ConfirmationStyles from "./ConfirmationStyles"

import confirmationIcon from "../../../images/tag.svg"
import NameAdornment from "../../../images/NameAdornment"
import EmailAdornment from "../../../images/EmailAdornment"
import PhoneAdornment from "../../../images/PhoneAdornment"
import streetAdornment from "../../../images/street-adornment.svg"
import zipAdornment from "../../../images/zip-adornment.svg"
import promoAdornment from "../../../images/promo-code.svg"
import cardAdornment from "../../../images/card.svg"

export default function Confirmation({
  user,
  detailValues,
  billingDetails,
  detailBillingSwitch,
  locationValues,
  billingLocation,
  locationBillingSwitch,
  shippingOptions,
  selectedShipping,
  selectedStep,
  setSelectedStep,
  setOrder,
}) {
  const classes = ConfirmationStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const [loading, setLoading] = useState(false)
  const { cart, dispatchCart } = useContext(CartContext)
  const { dispatchFeedback } = useContext(FeedbackContext)

  const [promo, setPromo] = useState({ promo: "" })
  const [promoError, setPromoError] = useState({})

  const shipping = shippingOptions.find(
    option => option.label === selectedShipping
  )

  const subtotal = cart.reduce(
    (total, item) => total + item.variant.price * item.qty,
    0
  )

  const tax = subtotal * 0.2

  const firstFields = [
    {
      value: detailValues.name,
      adornment: (
        <div className={classes.nameWrapper}>
          <NameAdornment color="#fff" />
        </div>
      ),
    },
    {
      value: detailValues.email,
      adornment: (
        <div className={classes.emailWrapper}>
          <EmailAdornment color="#fff" />
        </div>
      ),
    },
    {
      value: detailValues.phone,
      adornment: (
        <div className={classes.phoneWrapper}>
          <PhoneAdornment />
        </div>
      ),
    },
    {
      value: locationValues.street,
      adornment: <img src={streetAdornment} alt="street address" />,
    },
  ]

  const secondFields = [
    {
      value: `${locationValues.zip}, ${locationValues.city} ${locationValues.state}`,
      adornment: <img src={zipAdornment} alt="city, state, zip code" />,
    },
    {
      value: "**** **** **** 1234",
      adornment: (
        <img src={cardAdornment} alt="credit card" className={classes.card} />
      ),
    },
    {
      promo: {
        helperText: "",
        placeholder: "Promo code",
        startAdornment: <img src={promoAdornment} alt="promo code" />,
      },
    },
  ]

  const prices = [
    {
      label: "SUBTOTAL",
      value: subtotal.toFixed(2),
    },
    {
      label: "SHIPPING",
      value: shipping.price.toFixed(2),
    },
    {
      label: "TAX",
      value: tax.toFixed(2),
    },
  ]

  const total = prices.reduce(
    (total, item) => total + parseFloat(item.value),
    0
  )

  const adornmentValue = (adornment, value) => (
    <>
      <Grid item xs={2} classes={{ root: classes.adornmentWrapper }}>
        {adornment}
      </Grid>
      <Grid item xs={10} classes={{ root: classes.centerText }} zeroMinWidth>
        <Typography noWrap variant="body1" classes={{ root: classes.text }}>
          {value}
        </Typography>
      </Grid>
    </>
  )

  const handleOrder = () => {
    setLoading(true)

    axios
      .post(
        process.env.GATSBY_STRAPI_URL + "/orders/place",
        {
          shippingAddress: locationValues,
          billingAddress: billingLocation,
          shippingInfo: detailValues,
          billingInfo: billingDetails,
          shippingOption: shipping,
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
          items: cart,
        },
        {
          headers:
            user.username === "Guest"
              ? undefined
              : { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then(response => {
        setLoading(false)

        dispatchCart(clearCart())

        setOrder(response.data.order)

        setSelectedStep(selectedStep + 1)
      })
      .catch(error => {
        setLoading(false)
        console.error(error)

        switch (error.response.status) {
          case 400:
            dispatchFeedback(
              setSnackbar({ status: "error", message: "Invalid Cart" })
            )
            break
          case 409:
            dispatchFeedback(
              setSnackbar({
                status: "error",
                message:
                  `The following items are not available at the requested quantity. Please update your cart and try again.\n` +
                  `${error.response.data.unavailable.map(
                    item => `\nItem: ${item.id}, Available: ${item.qty}`
                  )}`,
              })
            )
            break
          default:
            dispatchFeedback(
              setSnackbar({
                status: "error",
                message:
                  "Something went wrong, please refresh the page and try again. you have NOT been charged.",
              })
            )
        }
      })
  }

  return (
    <Grid
      item
      container
      direction="column"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item container>
        <Grid item container direction="column" xs={7}>
          {firstFields.map((field, i) => (
            <Grid
              item
              container
              alignItems="center"
              key={field.value}
              classes={{
                root: clsx(classes.fieldRow, {
                  [classes.darkBackground]: i % 2 !== 0,
                }),
              }}
            >
              {adornmentValue(field.adornment, field.value)}
            </Grid>
          ))}
        </Grid>
        <Grid item xs={5} classes={{ root: classes.iconWrapper }}>
          <img src={confirmationIcon} alt="confirmation" />
        </Grid>
      </Grid>
      {secondFields.map((field, i) => (
        <Grid
          item
          container
          alignItems="center"
          key={i}
          classes={{
            root: clsx(classes.fieldRow, {
              [classes.darkBackground]: i % 2 !== 0,
            }),
          }}
        >
          <Grid item container xs={7}>
            {field.promo ? (
              <span className={classes.fieldWrapper}>
                <Fields
                  fields={field}
                  values={promo}
                  setValues={setPromo}
                  errors={promoError}
                  setErrors={setPromoError}
                  isWhite
                  xs={matchesXS}
                />
              </span>
            ) : (
              adornmentValue(field.adornment, field.value)
            )}
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={6}>
              <Typography variant="h5" classes={{ root: classes.priceLabel }}>
                {prices[i].label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="right"
                variant="body2"
                classes={{ root: classes.priceValue }}
              >{`$${prices[i].value}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item classes={{ root: classes.buttonWrapper }}>
        <Button
          onClick={handleOrder}
          classes={{ root: classes.button, disabled: classes.disabled }}
          disabled={cart.length === 0 || loading}
        >
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography variant="h5">PLACE ORDER</Typography>
            </Grid>
            <Grid item>
              {loading ? (
                <CircularProgress />
              ) : (
                <Chip
                  label={`$${total.toFixed(2)}`}
                  classes={{ root: classes.chipRoot, label: classes.chipLabel }}
                />
              )}
            </Grid>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  )
}
