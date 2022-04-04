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
  const imageIndex = colorIndex(product, variant, selectedColor)

  const images =
    imageIndex !== -1
      ? product.node.variants[imageIndex].images
      : variant.images

  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex

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
        {images.slice(0, 3).map(image => (
          <Grid
            item
            key={image.url}
            component={Link}
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
