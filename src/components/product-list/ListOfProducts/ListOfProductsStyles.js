import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  productContainer: {
    width: "95%",
    "& > *": {
      marginRight: ({ layout }) =>
        layout === "grid" ? "calc((100% - (25rem * 4)) /3)" : 0,
      marginBottom: "5rem",
    },
    "& > :nth-child(4n)": {
      marginRight: 0,
    },
  },
}))
