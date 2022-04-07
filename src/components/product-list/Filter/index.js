import React from "react"

import {
  Grid,
  IconButton,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core"

import FilterStyles from "./FilterStyles"

import filter from "../../../images/filter.svg"
import close from "../../../images/close-outline.svg"

/**
 * This function renders a filter menu for the user to filter the results
 * @returns A grid container with a filter icon, a close icon, and a grid item for each filter option.
 */
export default function Filter({ setOption, filterOptions, setFilterOptions }) {
  const classes = FilterStyles()
  /**
   * It takes in an option and an index, and it toggles the value of the option at the given index
   * @param option - the name of the filter option, e.g. "genre"
   * @param i - The index of the option in the array of options.
   */
  const handleFilter = (option, i) => {
    const newFilters = { ...filterOptions }

    /* This is a ternary operator that toggles the value of the checkbox. */
    newFilters[option][i].checked = !newFilters[option][i].checked

    setFilterOptions(newFilters)
  }

  return (
    <Grid
      item
      container
      justifyContent="space-between"
      alignItems="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={filter} alt="filter" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container justifyContent="space-around">
          /* Rendering the checkboxes for each filter option. */
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option] !== null)
            .map(option => (
              <Grid item key={option}>
                <Grid container direction="column">
                  <Grid item>
                    <Chip label={option} />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(({ label, checked }, i) => (
                          <FormControlLabel
                            classes={{ label: classes.checkbox }}
                            key={label}
                            label={label}
                            control={
                              <Checkbox
                                classes={{ root: classes.checkbox }}
                                checked={checked}
                                name={label}
                                onChange={() => handleFilter(option, i)}
                              />
                            }
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
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
