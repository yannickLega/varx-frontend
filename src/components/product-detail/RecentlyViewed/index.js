import React, { useState } from "react"

import ProductFrameGrid from "../../product-list/ProductFrameGrid"

import { Grid, Button, useMediaQuery } from "@material-ui/core"

import RecentlyViewedStyles from "./RecentlyViewedStyles"

export default function RecentlyViewed({ products }) {
  const classes = RecentlyViewedStyles()
  const [firstIndex, setFirstIndex] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const displayNum = matchesSM ? 1 : matchesMD ? 2 : 4

  const handleNavigation = direction => {
    if (firstIndex === 0 && direction === "backward") return null
    if (firstIndex + displayNum === products.length && direction === "forward")
      return null

    setFirstIndex(direction === "forward" ? firstIndex + 1 : firstIndex - 1)
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      classes={{ root: classes.RecentContainer }}
    >
      <Grid item>
        <Button
          onClick={() => handleNavigation("backward")}
          classes={{ root: classes.arrows }}
        >
          {"<"}
        </Button>
      </Grid>
      {products
        ? products.slice(firstIndex, firstIndex + displayNum).map(product => {
            const hasStyles = product.node.variants.some(
              variant => variant.style !== null
            )

            return (
              <ProductFrameGrid
                key={product.node.variants[product.selectedVariant].id}
                product={product}
                variant={product.node.variants[product.selectedVariant]}
                disableQuickView
                small
                hasStyles={hasStyles}
              />
            )
          })
        : null}
      <Grid item>
        <Button
          onClick={() => handleNavigation("forward")}
          classes={{ root: classes.arrows }}
        >
          {">"}
        </Button>
      </Grid>
    </Grid>
  )
}
