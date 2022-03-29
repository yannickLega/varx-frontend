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

export default function Filter({ setOption, filterOptions, setFilterOptions }) {
  const classes = FilterStyles()
  const handleFilter = (option, i) => {
    const newFilters = { ...filterOptions }

    //toggle value from checkbox
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
