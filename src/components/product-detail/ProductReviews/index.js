import React from "react"

import ProductReview from "../ProductReview"

import { Grid, Typography } from "@material-ui/core"

import ProductReviewsStyles from "./ProductReviewsStyles"

export default function ProductReviews() {
  const classes = ProductReviewsStyles()

  return (
    <Grid
      item
      container
      direction="column"
      classes={{ root: classes.reviews }}
    >
      <ProductReview />
    </Grid>
  )
}
