import React from "react"
import Sort from "../Sort"
import Filter from "../Filter"

import { Grid, IconButton } from "@material-ui/core"

import FunctionContainerStyles from "./FunctionContainerStyles"

import filter from "../../../images/filter.svg"
import sort from "../../../images/sort.svg"

/**
 * It renders the function container, which is the area that contains the filter and sort options
 * @returns A grid item container with a function container inside.
 */
export default function FunctionContainer({
  filterOptions,
  setFilterOptions,
  option,
  setOption,
  sortOptions,
  setSortOptions,
}) {
  const classes = FunctionContainerStyles({ option })

  /**
   * It returns a grid of buttons that allow the user to filter and sort the data
   * @returns A switch statement is being used to return the correct component.
   */
  const content = () => {
    switch (option) {
      case "sort":
        return (
          <Sort
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            setOption={setOption}
          />
        )
      case "filter":
        return (
          <Filter
            setOption={setOption}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        )
      default:
        const items = [
          { icon: filter, alt: "filter" },
          { icon: sort, alt: "sort" },
        ]

        return (
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
          >
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton onClick={() => setOption(item.alt)}>
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  return (
    <Grid item container classes={{ root: classes.functionContainer }}>
      /* Returning the correct component based on the `option` state. */
      {content()}
    </Grid>
  )
}
