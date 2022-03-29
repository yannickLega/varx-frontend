import React, { useState } from "react"
import QuickView from "../QuickView"
import clsx from "clsx"
import { navigate } from "gatsby"

import { Grid, Typography, useMediaQuery } from "@material-ui/core"

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
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const [open, setOpen] = useState(false)

  if (matchesMD && open) {
    setOpen(false)
  }

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
      <Grid
        container
        direction="column"
        onClick={() =>
          matchesMD
            ? navigate(
                `/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}`
              )
            : setOpen(true)
        }
      >
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
