import React, { useState } from "react"

import ProductFrameGrid from "../../product-list/ProductFrameGrid"

import { Grid, Button, useMediaQuery } from "@material-ui/core"

import RecentlyViewedStyles from "./RecentlyViewedStyles"

/**
 * This function renders a grid of products that are displayed in a carousel
 * @returns A grid item container with a button to navigate backward and forward.
 */
export default function RecentlyViewed({ products }) {
  const classes = RecentlyViewedStyles()
  const [firstIndex, setFirstIndex] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  /* This is a ternary operator that returns 1 if the screen is small, 2 if the screen is medium, and 4
  if the screen is large. 
  */
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
