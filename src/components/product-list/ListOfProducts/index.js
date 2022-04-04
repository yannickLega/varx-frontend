import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import { GET_DETAILS } from "../../../apollo/queries"

import ProductFrameGrid from "../ProductFrameGrid"
import ProductFrameList from "../ProductFrameList"

import { Grid, useMediaQuery } from "@material-ui/core"

import ListOfProductsStyles from "./ListOfProductsStyles"

export default function ListOfProducts({
  products,
  content,
  layout,
  page,
  productsPerPage,
  filterOptions,
}) {
  const classes = ListOfProductsStyles({ layout })
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const FrameHelper = ({ Frame, product, variant }) => {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [stock, setStock] = useState(null)

    //apollo query call
    const { loading, error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapiId },
    })

    useEffect(() => {
      if (error) {
        setStock(-1)
      } else if (data) {
        setStock(data.product.variants)
      }
    }, [error, data])

    let sizes = []
    let colors = []
    product.node.variants.map(variant => {
      sizes.push(variant.size)

      // check to not duplicate colors for variant male and female
      if (!colors.includes(variant.color)) {
        colors.push(variant.color)
      }
      return null
    })

    const hasStyles = product.node.variants.some(
      variant => variant.style !== null
    )

    return (
      <Frame
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        variant={variant}
        product={product}
        hasStyles={hasStyles}
        stock={stock}
      />
    )
  }

  return (
    <Grid
      item
      container
      direction={matchesSM ? "column" : "row"}
      alignItems={matchesSM ? "center" : undefined}
      classes={{ root: classes.productContainer }}
    >
      {content
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map(item => (
          <FrameHelper
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            key={item.variant.id}
            variant={item.variant}
            product={products[item.product]}
          />
        ))}
    </Grid>
  )
}
