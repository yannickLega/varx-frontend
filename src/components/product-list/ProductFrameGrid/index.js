import React, { useState } from "react"
import QuickView from "../QuickView"
import clsx from "clsx"

import { Grid, Typography } from "@material-ui/core"

import ProductFrameGridStyles from "./ProductFrameGridStyles"

export const colorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(
    //check variant style male or female to set color with the right style
    product.node.variants.filter(
      item => item.color === color && variant.style === item.style
    )[0]
  )
}

export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
}) {
  const classes = ProductFrameGridStyles()
  const [open, setOpen] = useState(false)

  const imageIndex = colorIndex(product, variant, selectedColor)

  const imgURL =
    process.env.GATSBY_STRAPI_URL +
    (imageIndex !== -1
      ? product.node.variants[imageIndex].images[0].url
      : variant.images[0].url)
  const productName = product.node.name.split(" ")[0]

  return (
    <Grid
      item
      classes={{
        root: clsx(classes.frameContainer, {
          [classes.invisibility]: open === true,
        }),
      }}
    >
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
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
      />
    </Grid>
  )
}
