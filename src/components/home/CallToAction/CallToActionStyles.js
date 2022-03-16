import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  account: {
    color: "#fff",
    marginLeft: "2rem",
  },
  body: {
    maxWidth: "45rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  container: {
    marginBottom: "15rem",
  },
  buttonContainer: {
    marginTop: "3rem",
  },
  headingContainer: {
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      height: "18rem",
      width: "20rem",
    },
  },
}))
