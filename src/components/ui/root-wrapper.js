import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { ApolloWrapper } from "../../apollo/ApolloWrapper"
import { UserWrapper, FeedbackWrapper, CartWrapper } from "../../contexts"
import theme from "./theme"

/**
 * It takes in an element and wraps it in a ThemeProvider and ApolloProvider
 * @returns The ApolloWrapper component is being returned.
 */
const RootWrapper = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>
        <UserWrapper>
          <FeedbackWrapper>
            <CartWrapper>{element}</CartWrapper>
          </FeedbackWrapper>
        </UserWrapper>
      </ApolloWrapper>
    </ThemeProvider>
  )
}

export default RootWrapper
