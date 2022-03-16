import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  textContainer: {
    padding: "2rem",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
  heading: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
}))
