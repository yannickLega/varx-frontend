import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./client"

/**
 * It creates a new Apollo client and wraps the children in an ApolloProvider
 * @returns The ApolloProvider component.
 */
export const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
