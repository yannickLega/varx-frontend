import React from "react"
import clsx from "clsx"

import { Grid, Typography, Button } from "@material-ui/core"

import SizesStyles from "./SizesStyles"

/**
 * This function creates a grid of buttons that are
 * sized according to the sizes array. It also creates a button that is selected according to the
 * selectedSize
 * @returns A grid item container with buttons inside of it.
 */
export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
  const classes = SizesStyles()

  const possibleSizes = ["S", "M", "L"]
  let actualSizes = []

  /* This is a ternary operator that checks if all the sizes in the array are in the array of sizes. If
they are, it sets the actualSizes to the possibleSizes. If not, it sets it to an empty array. */
  if (possibleSizes.every(size => sizes.includes(size))) {
    actualSizes = possibleSizes
  }

  return (
    <Grid item container justifyContent="space-between">
      {/* This is a for loop that creates a grid item for each size in the array
      of sizes. It also creates a button that is selected if the size is the
      selected size. */}
      {actualSizes.map(size => (
        <Grid item key={size}>
          <Button
            onClick={() => setSelectedSize(size)}
            classes={{
              root: clsx(classes.button, {
                [classes.selected]: selectedSize === size,
              }),
            }}
          >
            <Typography variant="h3" classes={{ root: classes.size }}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
