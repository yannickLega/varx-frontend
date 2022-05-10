import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import clsx from "clsx"

import { UserContext, FeedbackContext } from "../../../contexts"
import { setSnackbar, setUser } from "../../../contexts/actions"

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@material-ui/core"

import PaymentsStyles from "./PaymentsStyles"

import cardIcon from "../../../images/card.svg"
import Slots from "../Slots"

export default function Payments({
  user,
  slot,
  setSlot,
  checkout,
  saveCard,
  setSaveCard,
  setCardError,
  selectedStep,
  stepNumber,
  setCard,
}) {
  const classes = PaymentsStyles({ checkout, selectedStep, stepNumber })

  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)

  const { dispatchUser } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)

  const card =
    user.username === "Guest"
      ? { last4: "", brand: "" }
      : user.paymentMethods[slot]

  const removeCard = () => {
    setLoading(true)

    axios
      .post(
        process.env.GATSBY_STRAPI_URL + "/orders/removeCard",
        {
          card: card.last4,
        },
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then(response => {
        setLoading(false)

        dispatchUser(
          setUser({ ...response.data.user, jwt: user.jwt, onboarding: true })
        )
        setCardError(true)
        setCard({ brand: "", last4: "" })
      })
      .catch(error => {
        setLoading(false)
        console.error(error)

        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem removing your card. Please try again.",
          })
        )
      })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) return
  }

  const handleCardChange = async event => {
    if (event.complete) {
      const cardElement = elements.getElement(CardElement)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      })

      setCard({
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
      })
      setCardError(false)
    } else {
      setCardError(true)
    }
  }

  const cardWrapper = (
    <form onSubmit={handleSubmit} className={classes.form}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
              fontFamily: "Montserrat",
              color: "#fff",
              iconColor: "#fff",
              "::placeholder": {
                color: "#fff",
              },
            },
          },
        }}
        onChange={handleCardChange}
      />
    </form>
  )

  useEffect(() => {
    if (!checkout || !user.jwt) return

    if (user.paymentMethods[slot].last4 !== "") {
      setCard(user.paymentMethods[slot])
      setCardError(false)
    } else {
      setCard({ brand: "", last4: "" })
      setCardError(true)
    }
  }, [slot])

  return (
    <Grid
      item
      container
      direction="column"
      lg={checkout ? 12 : 6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.paymentsContainer }}
    >
      <Grid item>
        <img src={cardIcon} alt="payment settings" className={classes.icon} />
      </Grid>
      <Grid item container justifyContent="center">
        {checkout && !card.last4 ? cardWrapper : null}
        <Grid item>
          <Typography
            align="center"
            variant="h3"
            classes={{ root: classes.number }}
          >
            {card.last4
              ? `${card.brand.toUpperCase()} **** **** ${card.last4}`
              : checkout
              ? null
              : "Add a new card during checkout"}
          </Typography>
        </Grid>
        {card.last4 && (
          <Grid
            item
            classes={{
              root: clsx({
                [classes.spinner]: loading,
              }),
            }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                onClick={removeCard}
                variant="contained"
                classes={{ root: classes.removeCard }}
              >
                <Typography
                  variant="h6"
                  classes={{ root: classes.removeCardText }}
                >
                  Remove Card
                </Typography>
              </Button>
            )}
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        classes={{ root: classes.slotsContainer }}
      >
        <Slots slot={slot} setSlot={setSlot} noLabel />
        {checkout && user.username !== "Guest" && (
          <Grid item>
            <FormControlLabel
              classes={{
                root: classes.switchWrapper,
                label: classes.switchLabel,
              }}
              label="Save Card For Future Use"
              labelPlacement="start"
              control={
                <Switch
                  disabled={user.paymentMethods[slot].last4 !== ""}
                  checked={
                    user.paymentMethods[slot].last4 !== "" ? true : saveCard
                  }
                  onChange={() => setSaveCard(!saveCard)}
                  color={"secondary"}
                />
              }
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
