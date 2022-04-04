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

export default function ProductInfo({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
}) {
  const classes = ProductInfoStyles()

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const imageIndex = colorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )

  const sizes = []
  const colors = []

  variants.map(variant => {
    sizes.push(variant.size)

    if (!colors.includes(variant.color)) {
      colors.push(variant.color)
    }
    return null
  })

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex, setSelectedVariant])

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
            <QtyButton stock={stock} selectedVariant={selectedVariant} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
