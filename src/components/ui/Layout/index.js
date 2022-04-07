/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../Header"
import Footer from "../Footer"

import LayoutStyles from "./LayoutStyles"

/**
 * This is a function that takes in children and returns a layout with a header and footer
 * @returns The Layout component is returning the Header, the main, and the Footer.
 */
const Layout = ({ children }) => {
  const classes = LayoutStyles()

/* This is a query to get all the categories from the strapi database. */
  const data = useStaticQuery(graphql`
    query MyQuery {
      allStrapiCategory {
        edges {
          node {
            name
            strapiId
          }
        }
      }
    }
  `)

  return (
    <>
      <Header categories={data.allStrapiCategory.edges} />
      <div className={classes.spacer} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
