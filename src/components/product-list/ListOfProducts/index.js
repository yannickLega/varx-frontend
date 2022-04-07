import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import { GET_DETAILS } from "../../../apollo/queries"

import ProductFrameGrid from "../ProductFrameGrid"
import ProductFrameList from "../ProductFrameList"

import { Grid, useMediaQuery } from "@material-ui/core"

import ListOfProductsStyles from "./ListOfProductsStyles"

/**
 * This function is responsible for rendering the products
 * @returns A grid of products.
 */
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

  /**
   * It takes a product and a variant and returns a FrameHelper component
   * @returns The FrameHelper component is being returned.
   */
  const FrameHelper = ({ Frame, product, variant }) => {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [stock, setStock] = useState(null)

    /* This is a query to get the stock of the product. */
    const { loading, error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapiId },
    })

    /* This is a query to get the stock of the product. */
    useEffect(() => {
      if (error) {
        setStock(-1)
      } else if (data) {
        setStock(data.product.variants)
      }
    }, [error, data])

    /* This is a way to set the default color for the product. */
    useEffect(() => {
      if (selectedSize === null) return undefined
      setSelectedColor(null)
      const newVariant = product.node.variants.find(
        item =>
          item.size === selectedSize &&
          item.style === variant.style &&
          item.color === colors[0]
      )
      setSelectedVariant(newVariant)
    }, [selectedSize])

    /* 
    Adding the sizes and colors to the array.
    This is a way to set the default color for the product. 
    */
    let sizes = []
    let colors = []
    /*  */
    product.node.variants.map(item => {
      sizes.push(item.size)

      // check to not duplicate colors for variant male and female and colors available for selected style and size
      if (
        !colors.includes(item.color) &&
        item.size === (selectedSize || variant.size) &&
        item.style === variant.style
      ) {
        colors.push(item.color)
      }
      return null
    })

    /* This is a way to check if the product has styles. */
    const hasStyles = product.node.variants.some(
      variant => variant.style !== null
    )

    return (
      <Frame
        sizes={sizes}
        selectedSize={selectedSize || variant.size}
        setSelectedSize={setSelectedSize}
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        variant={selectedVariant || variant}
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
