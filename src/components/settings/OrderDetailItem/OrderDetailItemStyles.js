import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  product: {
    width: "8rem",
    height: "8rem",
  },
  chipRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  itemInfo: {
    textAlign: "right",
  },
  container: {
    height: "10rem",
  },
}))
