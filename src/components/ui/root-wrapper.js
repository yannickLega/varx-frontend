import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { ApolloWrapper } from "../../apollo/ApolloWrapper"
import theme from "./theme"

/**
 * It takes in an element and wraps it in a ThemeProvider and ApolloProvider
 * @returns The ApolloWrapper component is being returned.
 */
const RootWrapper = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>{element}</ApolloWrapper>
    </ThemeProvider>
  )
}

export default RootWrapper
