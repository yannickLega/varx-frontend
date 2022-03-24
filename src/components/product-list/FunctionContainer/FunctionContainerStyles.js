import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "6rem",
    height: "auto",
    borderRadius: ({ option }) =>
      option !== null ? "10px" : "10px 10px 0px 0px",
  },
}))
