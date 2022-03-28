import React, { useState } from "react"

import FunctionContainer from "../FunctionContainer"
import DescriptionContainer from "../DescriptionContainer"

import { Grid } from "@material-ui/core"

import DynamicToolbarStyles from "./DynamicToolbarStyles"

export default function DynamicToolbar({
  filterOptions,
  name,
  description,
  layout,
  setLayout,
  setPage,
}) {
  const classes = DynamicToolbarStyles()
  const [option, setOption] = useState(null)

  return (
    <Grid item container direction="column" classes={{ root: classes.toolbar }}>
      <FunctionContainer
        option={option}
        setOption={setOption}
        filterOptions={filterOptions}
      />
      {option === null && (
        <DescriptionContainer
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
          setPage={setPage}
        />
      )}
    </Grid>
  )
}
