import React, { useState } from "react"
import QuickView from "../QuickView"
import clsx from "clsx"
import { navigate } from "gatsby"

import { Grid, Typography, useMediaQuery } from "@material-ui/core"

import ProductFrameGridStyles from "./ProductFrameGridStyles"

/**
 * Given a product, a variant, and a color, return the index of the variant in the product's variants
 * array
 * @param product - The product object.
 * @param variant - The variant that is currently selected.
 * @param color - the color of the product
 * @returns The index of the color in the variants array.
 */
export const colorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(
    //check variant style male or female to set color with the right style
    product.node.variants.filter(
      item =>
        item.color === color &&
        variant.style === item.style &&
        item.size === variant.size
    )[0]
  )
}

/**
 * This function renders a grid item that contains a product frame
 * @returns A grid item with a frame, title, and image.
 */
export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  disableQuickView,
  small,
  stock,
}) {
  const classes = ProductFrameGridStyles({ small })
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const [open, setOpen] = useState(false)

  if (matchesMD && open) {
    setOpen(false)
  }

  /* This function returns the index of the image in the product's images array that matches the selected
color. */
  const imageIndex = colorIndex(product, variant, selectedColor)

  /* This is a way to get the image url for the selected variant. If the variant has images, it will use
the first image. If the variant has no images, it will use the first image of the product. */
  const imgURL =
    process.env.GATSBY_STRAPI_URL +
    (imageIndex !== -1
      ? product.node.variants[imageIndex].images[0].url
      : variant.images[0].url)

  /* This is a way to get the product name without the style. */
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
        /* This is a way to navigate to the product page when the user clicks on the product frame.
        If the user is on a mobile device, it will open the quick view. If the user is on a desktop, it will
        navigate to the product page. 
        */
        onClick={() =>
          matchesMD || disableQuickView
            ? navigate(
                `/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`
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
        variant={variant}
        hasStyles={hasStyles}
        stock={stock}
        imageIndex={imageIndex}
      />
    </Grid>
  )
}
