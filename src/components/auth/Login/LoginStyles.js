import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  accountIcon: {
    marginTop: "2rem",
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 6,
  },
  visibleIcon: {
    padding: 0,
  },
  loginButton: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  reset: {
    marginTop: "-4rem",
  },
  facebookButton: {
    marginTop: "-0.5rem",
  },
  passwordError: {
    marginTop: 0,
  },
  facebookText: {
    fontSize: "1.5rem",
    fontWeight: 600,
    textTransform: "none",
  },
  bottomIcons: {
    padding: "0 0.5rem",
  },
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
}))
