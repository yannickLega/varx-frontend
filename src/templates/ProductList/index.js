import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import {
  alphabetic,
  time,
  price,
} from "../../components/product-list/Sort/SortFunctions"

import { Grid, Fab } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"

import Layout from "../../components/ui/Layout"
import DynamicToolbar from "../../components/product-list/DynamicToolbar"
import ListOfProducts from "../../components/product-list/ListOfProducts"
import ProductListStyles from "./ProductListStyles"

export default function ProductList({
  pageContext: { filterOptions: options, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const classes = ProductListStyles()

  const [layout, setLayout] = useState("grid")
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(options)
  const [sortOptions, setSortOptions] = useState([
    { label: "A-Z", active: true, function: data => alphabetic(data, "asc") },
    { label: "Z-A", active: false, function: data => alphabetic(data, "desc") },
    {
      label: "NEWEST",
      active: false,
      function: data => time(data, "asc"),
    },
    {
      label: "OLDEST",
      active: false,
      function: data => time(data, "desc"),
    },
    {
      label: "PRICE ↑",
      active: false,
      function: data => price(data, "asc"),
    },
    {
      label: "PRICE ↓",
      active: false,
      function: data => price(data, "desc"),
    },
    { label: "REVIEWS", active: false, function: data => data },
  ])
  const scrollRef = useRef(null)

  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setPage(1)
  }, [filterOptions, layout])

  const productsPerPage = layout === "grid" ? 16 : 6

  let content = []

  const selectedSort = sortOptions.filter(option => option.active)[0]
  const sortedProducts = selectedSort.function(products)

  sortedProducts.map((product, i) =>
    product.node.variants.map(variant => content.push({ product: i, variant }))
  )

  let isFiltered = false
  let filters = {}
  let filteredProducts = []

  Object.keys(filterOptions)
    .filter(option => filterOptions[option] !== null)
    .map(option => {
      filterOptions[option].forEach(value => {
        if (value.checked) {
          isFiltered = true

          if (filters[option] === undefined) {
            filters[option] = []
          }

          if (!filters[option].includes(value)) {
            filters[option].push(value)
          }

          content.forEach(item => {
            if (option === "Color") {
              if (
                item.variant.colorLabel === value.label &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item)
              }
            } else if (
              item.variant[option.toLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            }
          })
        }
      })
    })

  Object.keys(filters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let valid

      filters[filter].some(value => {
        if (filter === "Color") {
          if (item.variant.colorLabel === value.label) {
            valid = item
          }
        } else if (item.variant[filter.toLowerCase()] === value.label) {
          valid = item
        }
      })

      return valid
    })
  })

  if (isFiltered) {
    content = filteredProducts
  }

  // use Math.ceil() to round number to not have less than 1 page of products
  const numPages = Math.ceil(content.length / productsPerPage)

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <div ref={scrollRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts
          page={page}
          productsPerPage={productsPerPage}
          layout={layout}
          products={products}
          content={content}
          filterOptions={filterOptions}
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
          createdAt
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
            colorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`
