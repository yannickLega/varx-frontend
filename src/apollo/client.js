import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

/* It creates a new ApolloClient instance. */
export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GATSBY_STRAPI_URL + "/graphql",
    //equivalent fetch: fetch
    fetch,
  }),
  cache: new InMemoryCache(),
})
