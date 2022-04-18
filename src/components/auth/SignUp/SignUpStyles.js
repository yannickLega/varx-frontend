import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  addUserIcon: {
    height: "10rem",
    width: "11rem",
    marginTop: "5rem",
  },
  bottomIcons: {
    padding: "0 0.5rem",
    height: "3rem",
    width: "3rem",
  },
  facebookSignUp: {
    width: "20rem",
    borderRadius: 50,
    marginTop: "-3rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  removeButtonMargin: {
    marginTop: 0,
  },
  facebookText: {
    textTransform: "none",
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.25rem",
    },
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 6,
  },
}))
