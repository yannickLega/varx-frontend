import React from "react"

import { Grid, Typography, Chip } from "@material-ui/core"

import Rating from "../../ui/Rating"
import Sizes from "../Sizes"
import Swatches from "../Swatches"
import QtyButton from "../QtyButton"

import ProductFrameListStyles from "./ProductFrameListStyles"

export default function ProductFrameList({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
}) {
  const classes = ProductFrameListStyles()

  return (
    <Grid item container>
      <Grid
        item
        xs={9}
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.frame }}
      >
        {variant.images.slice(0, 3).map(image => (
          <Grid item key={image.url}>
            <img
              src={process.env.GATSBY_STRAPI_URL + image.url}
              alt={image.url}
              className={classes.productImage}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={3}
        container
        direction="column"
        justifyContent="space-between"
        classes={{ root: classes.info }}
      >
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h4">
              {product.node.name.split(" ")[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Rating number={3} />
          </Grid>
          <Grid item>
            <Chip label={`$${variant.price}`} />
          </Grid>
          <Grid item>
            <Typography variant="h3" classes={{ root: classes.stock }}>
              12 Currently In Stock
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column" classes={{root: classes.sizesAndSwatches}}>
          <Sizes
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <Swatches
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Grid>
        <QtyButton />
      </Grid>
    </Grid>
  )
}
