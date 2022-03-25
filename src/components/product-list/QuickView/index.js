import React, { useState } from "react"
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

export default function QuickView({
  open,
  setOpen,
  url,
  name,
  price,
  product,
}) {
  const classes = QuickViewStyles()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  let sizes = []
  let colors = []
  product.node.variants.map(variant => {
    sizes.push(variant.size)
    colors.push(variant.color)
    return null
  })

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <img src={url} alt="product" className={classes.productImage} />
          </Grid>
          <Grid
            item
            container
            justifyContent="space-between"
            classes={{ root: classes.toolbar }}
          >
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                classes={{ root: classes.infoContainer }}
              >
                <Grid item>
                  <Typography variant="h4">{name}</Typography>
                  <Rating number={4} />
                </Grid>
                <Grid item>
                  <Typography variant="h3" classes={{ root: classes.stock }}>
                    12 Currently In Stock
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
            <Grid item>
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
                <QtyButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
