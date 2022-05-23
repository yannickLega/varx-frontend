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

//reviews query
export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    product(id: $id) {
      reviews {
        id
        text
        rating
        updatedAt
        user {
          username
        }
      }
    }
  }
`
