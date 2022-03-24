import React from "react"

import { Grid, Typography } from "@material-ui/core"

import ProductFrameGridStyles from "./ProductFrameGridStyles"

export default function ProductFrameGrid({ product, variant }) {
  const classes = ProductFrameGridStyles()
  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={process.env.GATSBY_STRAPI_URL + variant.images[0].url}
            alt={product.node.name}
            className={classes.productImage}
          />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant="h5">
            {product.node.name.split(" ")[0]}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
