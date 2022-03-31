exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(
    // rename allStrapiProduct with products same way for allStrapiCategory
    `
      query {
        products: allStrapiProduct {
          edges {
            node {
              name
              strapiId
              description
              category {
                name
              }
              variants {
                id
                color
                size
                style
                price
                images {
                  url
                }
              }
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              name
              strapiId
              description
              filterOptions {
                Size {
                  checked
                  label
                }
                Style {
                  checked
                  label
                }
                Color {
                  checked
                  label
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const products = result.data.products.edges

  products.forEach(product => {
    createPage({
      path: `/${product.node.category.name.toLowerCase()}/${product.node.name
        .split(" ")[0]
        .toLowerCase()}`,
      component: require.resolve("./src/templates/ProductDetails"),
      context: {
        name: product.node.name,
        id: product.node.strapiId,
        category: product.node.category.name,
        description: product.node.description,
        variants: product.node.variants,
        product: product,
      },
    })
  })
  const categories = result.data.categories.edges

  categories.forEach(category => {
    createPage({
      path: `/${category.node.name.toLowerCase()}`,
      component: require.resolve("./src/templates/ProductList"),
      context: {
        name: category.node.name,
        description: category.node.description,
        id: category.node.strapiId,
        filterOptions: category.node.filterOptions,
      },
    })
  })
}
