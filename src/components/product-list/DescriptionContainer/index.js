import React from "react"
import clsx from "clsx"

import {
  Grid,
  Typography,
  ButtonGroup,
  Button,
  useMediaQuery,
} from "@material-ui/core"
import ListIcon from "../../../images/List"
import GridIcon from "../../../images/Grid"

import DescriptionContainerStyles from "./DescriptionContainerStyles"

export default function DescriptionContainer({
  name,
  description,
  layout,
  setLayout,
}) {
  const classes = DescriptionContainerStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const changeLayout = option => {
    setLayout(option)
  }

  return (
    <Grid
      item
      container
      direction={matchesMD ? "column" : "row"}
      justifyContent="center"
      alignItems={matchesMD ? "center" : undefined}
      classes={{ root: classes.mainContainer }}
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h4" align="center">
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
      <Grid item classes={{ root: classes.buttonGroup }}>
        <ButtonGroup classes={{ root: classes.buttonGroup }}>
          <Button
            onClick={() => changeLayout("list")}
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
            onClick={() => changeLayout("grid")}
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
