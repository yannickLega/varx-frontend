import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"

import {
  alphabetic,
  time,
  price,
} from "../../components/product-list/Sort/SortFunctions"

import { Grid, Fab } from "@material-ui/core"
import { Pagination, PaginationItem } from "@material-ui/lab"
import { styled } from "@material-ui/core/styles"

import Layout from "../../components/ui/Layout"
import DynamicToolbar from "../../components/product-list/DynamicToolbar"
import ListOfProducts from "../../components/product-list/ListOfProducts"
import ProductListStyles from "./ProductListStyles"

export const StyledPagination = props => {
  const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    fontFamily: "Montserrat",
    color: theme.palette.primary.main,
    "&.Mui-selected": {
      color: theme.palette.common.white,
    },
  }))

  return (
    <Pagination
      {...props}
      renderItem={item => <StyledPaginationItem {...item} />}
    />
  )
}

/**
 * This function renders the product list page
 * @returns The `ProductList` component returns a `Layout` component with a `Grid` container. The
 * `Grid` container has a `DynamicToolbar` component, a `ListOfProducts` component, and a `Pagination`
 * component.
 */
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

  /* This is a React Hook that sets the sortOptions state to an array of objects. Each object
contains a label, an active property, and a function. The label is the name of the option, the
active property is a boolean that is set to true if the option is selected, and the function is a
function that is used to sort the products. 
*/
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

  /* This is a React Hook that creates a ref object that is used to scroll to the top of the page. */
  const scrollRef = useRef(null)

  /**
   * It takes a reference to a DOM element and scrolls it into view
   */
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  /* This is a React Hook that sets the page to 1 when the filter options or layout changes. */
  useEffect(() => {
    setPage(1)
  }, [filterOptions, layout])

  /* This is a ternary operator that sets the number of products per page to 16 if the layout is grid,
and 6 if the layout is list. */
  const productsPerPage = layout === "grid" ? 16 : 6

  let content = []

  /* This is a ternary operator that sets the selectedSort variable to the first object in the
sortOptions array that has the active property set to true. */
  const selectedSort = sortOptions.filter(option => option.active)[0]
  const sortedProducts = selectedSort.function(products)

  sortedProducts.map((product, i) =>
    product.node.variants.map(variant => content.push({ product: i, variant }))
  )

  let isFiltered = false
  let filters = {}
  let filteredProducts = []

  /* Filtering the content array by checking if the value.checked is true. If it is, it is
pushing the item to the filteredProducts array. */
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
      return null
    })

  /* This is a ternary operator that checks if the value.checked is true. If it is, it is
pushing the item to the filteredProducts array. */
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
        return null
      })

      return valid
    })
  })

  /* This is a ternary operator that checks if the value.checked is true. If it is, it is
pushing the item to the filteredProducts array. */
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
        <StyledPagination
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
