import React, { useState } from "react"
import ProductFrameGrid from "../ProductFrameGrid"
import ProductFrameList from "../ProductFrameList"

import { Grid } from "@material-ui/core"

import ListOfProductsStyles from "./ListOfProductsStyles"

export default function ListOfProducts({ products, layout }) {
  const classes = ListOfProductsStyles({ layout })
  const FrameHelper = ({ Frame, product, variant }) => {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    let sizes = []
    let colors = []
    product.node.variants.map(variant => {
      sizes.push(variant.size)
      colors.push(variant.color)
      return null
    })
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
      />
    )
  }

  return (
    <Grid item container classes={{ root: classes.productContainer }}>
      {products.map(product =>
        product.node.variants.map(variant => (
          <FrameHelper
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            key={variant.id}
            variant={variant}
            product={product}
          />
        ))
      )}
    </Grid>
  )
}
