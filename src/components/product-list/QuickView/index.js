import React from "react"
import { Link } from "gatsby"

import { getStockDisplay } from "../../product-detail/ProductInfo"

import Rating from "../../ui/Rating"
import Sizes from "../Sizes"
import Swatches from "../Swatches"
import QtyButton from "../QtyButton"

import {
  Grid,
  Typography,
  Dialog,
  DialogContent,
  Button,
  Chip,
} from "@material-ui/core"

import QuickViewStyles from "./QuickViewStyles"

import explore from "../../../images/explore.svg"

/**
 * This function renders the QuickView Dialog
 * @returns A Dialog component.
 */
export default function QuickView({
  open,
  setOpen,
  url,
  name,
  price,
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
  imageIndex,
}) {
  const classes = QuickViewStyles()

  /* This is a ternary operator that checks if the imageIndex is -1. If it is,
it will return the index of the variant. If it is not, it will return the imageIndex. */
  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex

  /* This function is getting the stock display for the selected variant. */
  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            component={Link}
            /* This is a ternary operator that checks if the imageIndex is -1. If it is,
            it will return the index of the variant. If it is not, it will return the imageIndex. */
            to={`/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(" ")[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
          >
            <img src={url} alt="product" className={classes.productImage} />
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            classes={{ root: classes.toolbar }}
          >
            <Grid item classes={{ root: classes.infoItem }}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                classes={{ root: classes.infoContainer }}
                component={Link}
                /* This is a ternary operator that checks if the imageIndex is -1. If it is,
                it will return the index of the variant. If it is not, it will return the
                imageIndex. */
                to={`/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
              >
                <Grid item>
                  <Typography variant="h4">{name}</Typography>
                  <Rating number={4} />
                </Grid>
                <Grid item>
                  <Typography variant="h3" classes={{ root: classes.stock }}>
                    {stockDisplay}
                  </Typography>
                  <Button classes={{ root: classes.detailButton }}>
                    <Typography
                      variant="h3"
                      classes={{ root: classes.details }}
                    >
                      Details
                    </Typography>
                    <img
                      src={explore}
                      alt="go to product detail page"
                      className={classes.exploreIcon}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item classes={{ root: classes.chipContainer }}>
              <Chip label={`$${price}`} classes={{ root: classes.chipRoot }} />
            </Grid>
            <Grid item classes={{ root: classes.actionsItem }}>
              <Grid container direction="column">
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
                <span className={classes.qtyContainer}>
                  <QtyButton
                    name={name}
                    stock={stock}
                    selectedVariant={selectedVariant}
                    variants={product.node.variants}
                  />
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
