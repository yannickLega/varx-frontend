import React from "react"
import clsx from "clsx"

import { Grid, IconButton, Chip, useMediaQuery } from "@material-ui/core"

import SortStyles from "./SortStyles"

import sort from "../../../images/sort.svg"
import close from "../../../images/close-outline.svg"

/**
 * This function is used to display the sort options
 * @returns The return is a grid item container that contains the sort icon, the
 * sort chips, and the close icon.
 */
export default function Sort({ setOption, sortOptions, setSortOptions }) {
  const classes = SortStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  /* This is a way to set the active state of the chips. */
  const handleSort = i => {
    const newOptions = [...sortOptions]

    newOptions.map(option => (option.active = false))

    newOptions[i].active = true

    setSortOptions(newOptions)
  }

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton
          /* This is a way to close the sort menu when the user click. */
          onClick={() => setOption(null)}
        >
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction={matchesXS ? "column" : "row"}
          justifyContent="space-around"
          alignItems={matchesXS ? "center" : undefined}
        >
          {sortOptions.map((option, i) => (
            <Grid
              classes={{ root: classes.chipContainer }}
              item
              key={option.label}
            >
              <Chip
                label={option.label}
                /* This is a way to set the active state of the chips. */
                onClick={() => handleSort(i)}
                color={option.active !== true ? "primary" : "secondary"}
                classes={{
                  root: clsx({ [classes.notActive]: option.active !== true }),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          /* This is a way to close the sort menu when the user click. */
          onClick={() => setOption(null)}
        >
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
