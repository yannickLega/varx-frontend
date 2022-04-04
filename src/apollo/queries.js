import { gql } from "@apollo/client"

//product quantity query
export const GET_DETAILS = gql`
  query getDetails($id: ID!) {
    product(id: $id) {
      variants {
        qty
      }
    }
  }
`
