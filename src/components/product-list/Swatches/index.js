import React from "react"
import clsx from "clsx"

import { Grid, Button } from "@material-ui/core"

import SwatchesStyles from "./SwatchesStyles"

/**
 * Given a list of colors, and a selected color, render a grid of buttons that are styled with the
 * colors.
 *
 * The selected color is styled differently
 * @returns A grid item container with a grid item for each color.
 */
export default function Swatches({ colors, selectedColor, setSelectedColor }) {
  const classes = SwatchesStyles()

  return (
    <Grid item container>
      {colors.sort().map(color => (
        <Grid key={color} item classes={{ root: classes.swatchesContainer }}>
          <Button
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            classes={{
              root: clsx(classes.swatch, {
                [classes.selected]: selectedColor === color,
              }),
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}
