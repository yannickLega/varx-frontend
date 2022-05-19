import React, { useContext, useState, useRef } from "react"
import axios from "axios"
import clsx from "clsx"

import Rating from "../../ui/Rating"
import Fields from "../../auth/Fields"

import { UserContext, FeedbackContext } from "../../../contexts"
import { setSnackbar } from "../../../contexts/actions"

import { Grid, Typography, Button, CircularProgress } from "@material-ui/core"

import ProductReviewStyles from "./ProductReviewStyles"

export default function ProductReview({ product }) {
  const classes = ProductReviewStyles()
  const { user } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)

  const ratingRef = useRef(null)
  const [tempRating, setTempRating] = useState(0)
  const [rating, setRating] = useState(null)

  const [values, setValues] = useState({ message: "" })

  const [loading, setLoading] = useState(null)

  const fields = {
    message: {
      helperText: "",
      helperErrorText: "",
      placeholder: "Write your Review",
    },
  }

  const handleReview = () => {
    setLoading("leave-review")

    axios
      .post(
        process.env.GATSBY_STRAPI_URL + "/reviews",
        {
          text: values.message,
          product,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then(response => {
        setLoading(null)

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Product Reviewed Successfully",
          })
        )
      })
      .catch(error => {
        setLoading(null)
        console.error(error)

        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem leaving your review, please try again",
          })
        )
      })
  }

  return (
    <Grid item container direction="column">
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" classes={{ root: classes.light }}>
            {user.username}
          </Typography>
        </Grid>
        <Grid
          item
          classes={{ root: classes.rating }}
          ref={ratingRef}
          onMouseMove={e => {
            const hoverRating =
              ((ratingRef.current.getBoundingClientRect().left - e.clientX) /
                ratingRef.current.getBoundingClientRect().width) *
              -5

            setTempRating(Math.round(hoverRating * 2) / 2)
          }}
          onClick={() => setRating(tempRating)}
          onMouseLeave={() => {
            if (tempRating > rating) {
              setTempRating(rating)
            }
          }}
        >
          <Rating
            number={rating > tempRating ? rating : tempRating}
            size={2.5}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="h5"
          classes={{ root: clsx(classes.light, classes.date) }}
        >
          {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Fields
          values={values}
          setValues={setValues}
          fields={fields}
          fullWidth
          noError
        />
      </Grid>
      <Grid item container classes={{ root: classes.buttonContainer }}>
        <Grid item>
          {loading === "leave-review" ? (
            <CircularProgress />
          ) : (
            <Button
              onClick={handleReview}
              disabled={!rating}
              variant="contained"
              color="primary"
            >
              <span className={classes.reviewButtonText}>Leave Review</span>
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button>
            <span className={classes.cancelButtonText}>Cancel</span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
