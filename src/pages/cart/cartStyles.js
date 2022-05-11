import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  cartContainer: {
    ninHeight: "70vh",
  },
  name: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
}))
