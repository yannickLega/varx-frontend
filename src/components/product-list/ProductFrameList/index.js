import React from "react"
import { Link } from "gatsby"

import { getStockDisplay } from "../../product-detail/ProductInfo"

import { Grid, Typography, Chip } from "@material-ui/core"

import Rating from "../../ui/Rating"
import Sizes from "../Sizes"
import Swatches from "../Swatches"
import QtyButton from "../QtyButton"

import { colorIndex } from "../ProductFrameGrid"

import ProductFrameListStyles from "./ProductFrameListStyles"

/**
 * This function renders the product frame, which is the main image and the product info
 * @returns A grid item container with a grid item lg={9} that contains a grid item lg={3}
 */
export default function ProductFrameList({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  stock,
}) {
  const classes = ProductFrameListStyles()
  /* This function returns the index of the variant that has the selected color.
If the selected color is not in the variant, it returns -1. */
  const imageIndex = colorIndex(product, variant, selectedColor)

  /* This is a ternary operator that returns the images of the variant if the selected color is in the
variant.
If the selected color is not in the variant, it returns the images of the variant. */
  const images =
    imageIndex !== -1
      ? product.node.variants[imageIndex].images
      : variant.images

  /* This is a ternary operator that returns the index of the variant that has the selected color.
If the selected color is not in the variant, it returns -1. */
  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex

  /* This function returns the stock display for the selected variant. */
  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Grid item container>
      <Grid
        item
        lg={9}
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.frame }}
      >
        {/* This is a ternary operator that returns the images of the variant if
        the selected color is in the variant. If the selected color is not in
        the variant, it returns the images of the variant. */}
        {images.slice(0, 3).map(image => (
          <Grid
            item
            key={image.url}
            component={Link}
            // This is a ternary operator that returns the URL of the product. If the product has
            // styles, it returns the URL with the style. If the product does not have styles, it
            // returns the URL without the style.
            to={`/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(" ")[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
          >
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
        lg={3}
        container
        direction="column"
        justifyContent="space-between"
        classes={{ root: classes.info }}
      >
        <Grid
          item
          container
          direction="column"
          component={Link}
          // This is a ternary operator that returns the URL of the product.
          // If the product has styles, it returns the URL with the style.
          // If the product does not have styles, it returns the URL without the style.
          to={`/${product.node.category.name.toLowerCase()}/${product.node.name
            .split(" ")[0]
            .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
        >
          <Grid item>
            <Typography variant="h4">
              {product.node.name.split(" ")[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Rating number={3} />
          </Grid>
          <Grid item>
            <Chip
              label={`$${variant.price}`}
              classes={{ label: classes.chipLabel }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" classes={{ root: classes.stock }}>
              {stockDisplay}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          classes={{ root: classes.sizesAndSwatches }}
        >
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
        <QtyButton stock={stock} selectedVariant={selectedVariant} />
      </Grid>
    </Grid>
  )
}
