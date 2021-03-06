import React, { useState } from "react"

import FunctionContainer from "../FunctionContainer"
import DescriptionContainer from "../DescriptionContainer"

import { Grid } from "@material-ui/core"

import DynamicToolbarStyles from "./DynamicToolbarStyles"

/**
 * This function is responsible for rendering the toolbar
 * @returns A grid item container with a toolbar inside.
 */
export default function DynamicToolbar({
  filterOptions,
  setFilterOptions,
  name,
  description,
  layout,
  setLayout,
  sortOptions,
  setSortOptions,
}) {
  const classes = DynamicToolbarStyles()
  const [option, setOption] = useState(null)

  return (
    <Grid item container direction="column" classes={{ root: classes.toolbar }}>
      <FunctionContainer
        option={option}
        setOption={setOption}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
      />
      {option === null && (
        <DescriptionContainer
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
      )}
    </Grid>
  )
}
