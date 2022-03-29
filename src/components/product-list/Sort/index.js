import React from "react"

import { Grid, IconButton, Chip, useMediaQuery } from "@material-ui/core"

import SortStyles from "./SortStyles"

import sort from "../../../images/sort.svg"
import close from "../../../images/close-outline.svg"

export default function Sort({ setOption }) {
  const classes = SortStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const sortOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "NEWEST" },
    { label: "OLDEST" },
    { label: "PRICE ↑" },
    { label: "PRICE ↓" },
    { label: "REVIEWS" },
  ]

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction={matchesXS ? "column" : "row"}
          justifyContent="space-around"
          alignItems={matchesXS ? "center": undefined}
        >
          {sortOptions.map(option => (
            <Grid
              classes={{ root: classes.chipContainer }}
              item
              key={option.label}
            >
              <Chip label={option.label} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
