import React, { useContext, useState, useRef } from "react"
import axios from "axios"
import clsx from "clsx"

import Rating from "../../ui/Rating"
import Fields from "../../auth/Fields"

import { FeedbackContext } from "../../../contexts"
import { setSnackbar } from "../../../contexts/actions"

import { Grid, Typography, Button, CircularProgress } from "@material-ui/core"

import ProductReviewStyles from "./ProductReviewStyles"

export default function ProductReview({
  product,
  review,
  setEdit,
  reviews,
  user,
  setReviews,
}) {
  const classes = ProductReviewStyles()

  const { dispatchFeedback } = useContext(FeedbackContext)

  const found = !review
    ? reviews.find(review => review.user.username === user.username)
    : null

  const ratingRef = useRef(null)
  const [tempRating, setTempRating] = useState(0)
  const [rating, setRating] = useState(
    review ? review.rating : found ? found.rating : null
  )

  const [values, setValues] = useState({ message: found ? found.text : "" })

  const [loading, setLoading] = useState(null)

  const fields = {
    message: {
      helperText: "",
      helperErrorText: "",
      placeholder: "Write your Review",
    },
  }

  const handleReview = option => {
    setLoading(option === "delete" ? "delete-review" : "leave-review")

    const axiosFunction =
      option === "delete" ? axios.delete : found ? axios.put : axios.post
    const route =
      found || option === "delete" ? `/reviews/${found.id}` : "/reviews"

    const auth = { Authorization: `Bearer ${user.jwt}` }

    axiosFunction(
      process.env.GATSBY_STRAPI_URL + route,
      {
        text: values.message,
        product,
        rating,
        headers: option === "delete" ? auth : undefined,
      },
      {
        headers: auth,
      }
    )
      .then(response => {
        setLoading(null)

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: `${
              option === "delete" ? "Review Deleted" : "Product Reviewed"
            } Successfully`,
          })
        )

        let newReviews = [...reviews]
        const reviewIndex = newReviews.indexOf(found)

        if (option === "delete") {
          newReviews = newReviews.filter(review => review !== found)
        } else if (found) {
          newReviews[reviewIndex] = response.data
        } else {
          newReviews = [response.data, ...newReviews]
        }

        setReviews(newReviews)
        setEdit(false)
      })
      .catch(error => {
        setLoading(null)
        console.error(error)

        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: `There was a problem ${
              option === "delete" ? "removing" : "leaving"
            } your review, please try again`,
          })
        )
      })
  }

  const buttonDisabled = found
    ? found.text === values.message && found.rating === rating
    : !rating

  return (
    <Grid item container direction="column" classes={{ root: classes.review }}>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" classes={{ root: classes.light }}>
            {review ? review.user.username : user.username}
          </Typography>
        </Grid>
        <Grid
          item
          classes={{ root: clsx({ [classes.rating]: !review }) }}
          ref={ratingRef}
          onMouseMove={e => {
            if (review) return
            const hoverRating =
              ((ratingRef.current.getBoundingClientRect().left - e.clientX) /
                ratingRef.current.getBoundingClientRect().width) *
              -5

            setTempRating(Math.round(hoverRating * 2) / 2)
          }}
          onClick={() => (review ? null : setRating(tempRating))}
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
          {review
            ? new Date(review.updatedAt).toLocaleDateString([], {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        {review ? (
          <Typography variant="body1">{review.text}</Typography>
        ) : (
          <Fields
            values={values}
            setValues={setValues}
            fields={fields}
            fullWidth
            noError
          />
        )}
      </Grid>
      {review ? null : (
        <Grid item container classes={{ root: classes.buttonContainer }}>
          <Grid item>
            {loading === "leave-review" ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={handleReview}
                disabled={buttonDisabled}
                variant="contained"
                color="primary"
              >
                <span className={classes.reviewButtonText}>
                  {found ? "Edit" : "Leave"} Review
                </span>
              </Button>
            )}
          </Grid>
          {found ? (
            <Grid item>
              {loading === "delete-review" ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => handleReview("delete")}
                  variant="contained"
                  classes={{ root: classes.delete }}
                >
                  <span className={classes.reviewButtonText}>Delete</span>
                </Button>
              )}
            </Grid>
          ) : null}
          <Grid item>
            <Button onClick={() => setEdit(false)}>
              <span className={classes.cancelButtonText}>Cancel</span>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
