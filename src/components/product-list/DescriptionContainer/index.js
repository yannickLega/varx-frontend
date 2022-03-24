import React, { useState } from "react"
import clsx from "clsx"

import { Grid, Typography, ButtonGroup, Button } from "@material-ui/core"
import ListIcon from "../../../images/List"
import GridIcon from "../../../images/Grid"

import DescriptionContainerStyles from "./DescriptionContainerStyles"

export default function DescriptionContainer({ name, description }) {
  const classes = DescriptionContainerStyles()

  const [layout, setLayout] = useState("grid")

  return (
    <Grid
      item
      container
      justifyContent="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h4" paragraph gutterBottom align="center">
          {name}
        </Typography>
        <Typography
          variant="body1"
          classes={{ root: classes.description }}
          align="center"
        >
          {description}
        </Typography>
      </Grid>
      <Grid item classes={{root: classes.buttonGroup}} >
        <ButtonGroup classes={{ root: classes.buttonGroup }}>
          <Button
            onClick={() => setLayout("list")}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === "list",
              }),
            }}
          >
            <ListIcon
              color={layout === "list" ? "#fff" : undefined}
              align="center"
            />
          </Button>
          <Button
            onClick={() => setLayout("grid")}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === "grid",
              }),
            }}
          >
            <GridIcon color={layout === "grid" ? "#fff" : undefined} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
