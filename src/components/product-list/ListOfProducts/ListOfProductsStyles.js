import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  productContainer: {
    width: "95%",
    [theme.breakpoints.only("xl")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc((100% - (25rem * 4)) /3)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(4n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("lg")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc((100% - (25rem * 3)) /2)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(3n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("md")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc(100% - (25rem * 2))" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(2n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        marginBottom: "5rem",
      },
    },
  },
}))
