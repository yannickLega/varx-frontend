import React, { useState } from "react"
import QuickView from "../QuickView"

import { Grid, Typography } from "@material-ui/core"

import ProductFrameGridStyles from "./ProductFrameGridStyles"

export default function ProductFrameGrid({ product, variant }) {
  const classes = ProductFrameGridStyles()
  const [open, setOpen] = useState(false)

  const imgURL = process.env.GATSBY_STRAPI_URL + variant.images[0].url
  const productName = product.node.name.split(" ")[0]

  return (
    <Grid item>
      <Grid container direction="column" onClick={() => setOpen(true)}>
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={imgURL}
            alt={product.node.name}
            className={classes.productImage}
          />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant="h5">{productName}</Typography>
        </Grid>
      </Grid>
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgURL}
        name={productName}
        price={variant.price}
        product={product}
      />
    </Grid>
  )
}
