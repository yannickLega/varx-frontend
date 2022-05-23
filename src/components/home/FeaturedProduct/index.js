import React, { useState, useEffect } from "react"
import clsx from "clsx"

import { useQuery } from "@apollo/client"
import { GET_DETAILS } from "../../../apollo/queries"

import { Grid, Typography, IconButton, Button, Chip } from "@material-ui/core"

import explore from "../../../images/explore.svg"

import Rating from "../../ui/Rating"

import FeaturedProductStyles from "./FeaturedProductStyles"

export default function FeaturedProduct({
  node,
  i,
  matchesMD,
  expanded,
  setExpanded,
}) {
  const classes = FeaturedProductStyles()

  const [rating, setRating] = useState(0)
  const alignment = matchesMD
    ? "center"
    : i === 0 || i === 3
    ? "flex-start"
    : i === 1 || i === 4
    ? "center"
    : "flex-end"

  const { data } = useQuery(GET_DETAILS, {
    variables: { id: node.strapiId },
  })

  useEffect(() => {
    if (data) {
      setRating(data.product.rating)
    }
  }, [data])

  return (
    <Grid
      item
      container
      justifyContent={alignment}
      key={node.strapiId}
      classes={{ root: classes.productContainer }}
      alignItems="center"
    >
      <IconButton
        onClick={() => (expanded === i ? setExpanded(null) : setExpanded(i))}
        classes={{ root: classes.frame }}
      >
        <img
          src={process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url}
          alt={node.name}
          className={classes.featured}
        />
      </IconButton>
      <Grid
        container
        direction="column"
        classes={{
          root: clsx(classes.slide, {
            [classes.slideLeft]:
              !matchesMD && expanded === i && alignment === "flex-end",
            [classes.slideRight]:
              !matchesMD &&
              expanded === i &&
              (alignment === "flex-start" || alignment === "center"),
            [classes.slideDown]: matchesMD && expanded === i,
          }),
        }}
      >
        <Grid item>
          <Typography variant="h4">{node.name.split(" ")[0]}</Typography>
        </Grid>
        <Grid item>
          <Rating number={rating} />
        </Grid>
        <Grid item>
          <Chip
            classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            label={`$${node.variants[0].price}`}
          />
        </Grid>
        <Grid item classes={{ root: classes.exploreContainer }}>
          <Button classes={{ root: classes.exploreButton }}>
            <Typography variant="h5">Details</Typography>
            <img
              src={explore}
              alt="go to product details"
              className={classes.exploreIcon}
            />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
