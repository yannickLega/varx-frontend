import React from "react"
import ProductFrameGrid from "../ProductFrameGrid"

import { Grid } from "@material-ui/core"

import ListOfProductsStyles from "./ListOfProductsStyles"

export default function ListOfProducts({ products }) {
  const classes = ListOfProductsStyles()
  return (
    <Grid item container classes={{ root: classes.productContainer }}>
      {products.map(product =>
        product.node.variants.map(variant => (
          <ProductFrameGrid
            key={variant.id}
            variant={variant}
            product={product}
          />
        ))
      )}
    </Grid>
  )
}
