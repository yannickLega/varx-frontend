import React, { useState, useEffect, useContext } from "react"

import { useQuery } from "@apollo/client"
import { GET_REVIEWS } from "../../../apollo/queries"

import { UserContext } from "../../../contexts"

import ProductReview from "../ProductReview"

import { Grid } from "@material-ui/core"

import { StyledPagination } from "../../../templates/ProductList"

import ProductReviewsStyles from "./ProductReviewsStyles"

export default function ProductReviews({ product, edit, setEdit }) {
  const classes = ProductReviewsStyles()
  const { user } = useContext(UserContext)

  const [reviews, setReviews] = useState([])

  const [page, setPage] = useState(1)

  const { data } = useQuery(GET_REVIEWS, { variables: { id: product } })

  useEffect(() => {
    if (data) {
      setReviews(data.product.reviews)
    }
  }, [data])

  const reviewsPerPage = 10
  const numPages = Math.ceil(reviews.length / reviewsPerPage)

  return (
    <Grid
      id="reviews"
      item
      container
      direction="column"
      classes={{ root: classes.reviews }}
    >
      {edit && (
        <ProductReview
          user={user}
          product={product}
          setEdit={setEdit}
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
      {reviews
        .filter(review =>
          edit ? review.user.username !== user.username : review
        )
        .slice((page - 1) * reviewsPerPage, page * reviewsPerPage)
        .map(review => (
          <ProductReview
            reviews={reviews}
            key={review.id}
            product={product}
            review={review}
          />
        ))}
      <Grid item container justifyContent="flex-end">
        <Grid item>
          <StyledPagination
            classes={{ root: classes.pagination }}
            count={numPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
