import React from "react"

import ProductDetailsStyles from "./ProductDetailsStyles"

export default function ProductDetails({ pageContext }) {
  const classes = ProductDetailsStyles()

  return <div>{pageContext.name}</div>
}
