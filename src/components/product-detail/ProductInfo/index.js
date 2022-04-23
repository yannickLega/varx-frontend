import React, { useState, useEffect } from "react"
import clsx from "clsx"

import Rating from "../../ui/Rating"
import Swatches from "../../product-list/Swatches"
import Sizes from "../../product-list/Sizes"
import QtyButton from "../../product-list/QtyButton"
import { colorIndex } from "../../product-list/ProductFrameGrid"

import {
  Grid,
  Typography,
  Button,
  Chip,
  useMediaQuery,
} from "@material-ui/core"

import ProductInfoStyles from "./ProductInfoStyles"

import favorite from "../../../images/favorite.svg"
import subscription from "../../../images/subscription.svg"

/**
 * Given a stock object, return a string that represents the stock status of the product
 * @param stock - The stock object returned from the API.
 * @param variant - The variant of the product that we're displaying.
 * @returns A string.
 */
export const getStockDisplay = (stock, variant) => {
  switch (stock) {
    case undefined:
    case null:
      return "Loading Inventory..."
    case -1:
      return "Error Loading Inventory"
    default:
      if (stock[variant].qty === 0) {
        return "Out of Stock"
      } else {
        return `${stock[variant].qty} Currently In Stock`
      }
  }
}

/**
 * This function renders the product info section of the product page
 * @returns The ProductInfo component is returning a grid item container
 */
export default function ProductInfo({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
}) {
  const classes = ProductInfoStyles()

  const [selectedSize, setSelectedSize] = useState(
    variants[selectedVariant].size
  )
  const [selectedColor, setSelectedColor] = useState(null)

  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  /* This is a helper function that returns the index of the image that matches the selected color. */
  const imageIndex = colorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )

  /* This is a loop that is used to populate the sizes and colors arrays. */
  const sizes = []
  const colors = []

  variants.map(variant => {
    sizes.push(variant.size)

    if (
      !colors.includes(variant.color) &&
      variant.size === selectedSize &&
      variant.style === variants[selectedVariant].style
    ) {
      colors.push(variant.color)
    }
    return null
  })

  /* This is a React Hook that runs when the selectedSize changes. It finds the first color available for
the selected size and sets the selectedVariant to the index of that color. */
  useEffect(() => {
    setSelectedColor(null)
    const newVariant = variants.find(
      variant =>
        variant.size === selectedSize &&
        variant.style === variants[selectedVariant].style &&
        variant.color === colors[0]
    )
    setSelectedVariant(variants.indexOf(newVariant))
  }, [selectedSize])

  /* This is a React Hook that runs when the selectedColor changes. It finds the first variant available
for
the selected color and sets the selectedVariant to the index of that variant. */
  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex, setSelectedVariant])

  /* This function is returning a string that represents the stock status of the product. */
  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Grid
      item
      container
      direction="column"
      lg={6}
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid
        item
        container
        justifyContent="flex-end"
        classes={{ root: classes.background }}
      >
        <Grid item>
          <img
            src={favorite}
            alt="add item to favorites"
            className={classes.icon}
          />
        </Grid>
        <Grid item>
          <img
            src={subscription}
            alt="add item to subscriptions"
            className={classes.icon}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        classes={{ root: classes.center }}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          direction={matchesXS ? "column" : "row"}
          classes={{
            root: clsx(classes.detailsContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h1" classes={{ root: classes.name }}>
                  {name.split(" ")[0]}
                </Typography>
                <Grid item>
                  <Rating number={4} />
                </Grid>
                <Grid item>
                  <Button>
                    <Typography
                      variant="body2"
                      classes={{ root: classes.reviewButton }}
                    >
                      Leave a review {">"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item classes={{ root: classes.chipContainer }}>
            <Chip
              label={`$${variants[selectedVariant].price}`}
              classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          classes={{
            root: clsx(classes.sectionContainer, classes.descriptionContainer),
          }}
        >
          <Grid item>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={matchesXS ? "space-around" : "space-between"}
          direction={matchesXS ? "column" : "row"}
          alignItems={matchesXS ? "flex-start" : "center"}
          classes={{
            root: clsx(classes.actionsContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item classes={{ root: classes.sizesAndSwatches }}>
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
              <Grid item>
                <Typography variant="h3" classes={{ root: classes.stock }}>
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QtyButton
              stock={stock}
              selectedVariant={selectedVariant}
              name={name}
              variants={variants}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
