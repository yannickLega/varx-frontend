import React, { useState, useRef } from "react"
import { graphql } from "gatsby"

import { Grid, Fab } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"

import Layout from "../../components/ui/Layout"
import DynamicToolbar from "../../components/product-list/DynamicToolbar"
import ListOfProducts from "../../components/product-list/ListOfProducts"
import ProductListStyles from "./ProductListStyles"

export default function ProductList({
  pageContext: { filterOptions, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const classes = ProductListStyles()
  const [layout, setLayout] = useState("grid")
  const [page, setPage] = useState(1)
  const scrollRef = useRef(null)
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const productsPerPage = layout === "grid" ? 16 : 6
  let numVariants = 0

  products.map(product => (numVariants += product.node.variants.length))

  // use Math.ceil() to round number to not have less than 1 page of products
  const numPages = Math.ceil(numVariants / productsPerPage)

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <div ref={scrollRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
          setPage={setPage}
        />
        <ListOfProducts
          page={page}
          productsPerPage={productsPerPage}
          layout={layout}
          products={products}
        />
        <Pagination
          count={numPages}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
          classes={{ root: classes.pagination }}
        />
        <Fab onClick={scroll} color="primary" classes={{ root: classes.fab }}>
          ^
        </Fab>
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
          category {
            name
          }
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
