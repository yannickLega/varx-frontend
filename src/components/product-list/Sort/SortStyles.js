import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      margin: "0.5rem",
    },
  },
}))
