import React from "react"

import ProductReview from "../ProductReview"

import { Grid } from "@material-ui/core"

import ProductReviewsStyles from "./ProductReviewsStyles"

export default function ProductReviews({ product }) {
  const classes = ProductReviewsStyles()

  return (
    <Grid item container direction="column" classes={{ root: classes.reviews }}>
      <ProductReview product={product} />
    </Grid>
  )
}
