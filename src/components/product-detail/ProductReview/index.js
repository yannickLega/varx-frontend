import React, { useContext, useState, useRef } from "react"
import clsx from "clsx"

import Rating from "../../ui/Rating"
import Fields from "../../auth/Fields"

import { UserContext } from "../../../contexts"

import { Grid, Typography, Button } from "@material-ui/core"

import ProductReviewStyles from "./ProductReviewStyles"

export default function ProductReview() {
  const classes = ProductReviewStyles()
  const { user } = useContext(UserContext)

  const ratingRef = useRef(null)
  const [tempRating, setTempRating] = useState(0)
  const [rating, setRating] = useState(null)

  const [values, setValues] = useState({ message: "" })

  const fields = {
    message: {
      helperText: "",
      helperErrorText: "",
      placeholder: "Write your Review",
    },
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
          <Button variant="contained" color="primary">
            <span className={classes.reviewButtonText}>Leave Review</span>
          </Button>
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
