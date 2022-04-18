import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  reset: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    marginBottom: "4rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  icon: {
    marginTop: "2rem",
  },
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
}))
