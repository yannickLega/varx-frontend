import React from "react"
import clsx from "clsx"

import { Grid, Button } from "@material-ui/core"

import SwatchesStyles from "./SwatchesStyles"

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
