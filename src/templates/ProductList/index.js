import React, { useState } from "react"
import { graphql } from "gatsby"

import { Grid } from "@material-ui/core"

import Layout from "../../components/ui/Layout"
import DynamicToolbar from "../../components/product-list/DynamicToolbar"
import ListOfProducts from "../../components/product-list/ListOfProducts"

export default function ProductList({
  pageContext: { filterOptions, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const [layout, setLayout] = useState("list")

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts layout={layout} products={products} />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          name
          variants {
            id
            color
            price
            size
            style
            images {
              url
            }
          }
        }
      }
    }
  }
`
