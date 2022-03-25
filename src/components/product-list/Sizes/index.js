import React from "react"
import clsx from "clsx"

import { Grid, Typography, Button } from "@material-ui/core"

import SizesStyles from "./SizesStyles"

export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
  const classes = SizesStyles()

  const possibleSizes = ["S", "M", "L"]
  let actualSizes = []

  if (possibleSizes.every(size => sizes.includes(size))) {
    actualSizes = possibleSizes
  }

  return (
    <Grid item container justifyContent="space-between">
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
