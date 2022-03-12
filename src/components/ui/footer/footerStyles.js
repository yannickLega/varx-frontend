import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  icon: {
    height: "2rem",
    width: "2rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: "2rem",
  },
  "@global": {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: "none",
    },
  },
  linkColumn: {
    width: "20rem",
    padding: "1rem",
  },
  link: {
    color: theme.palette.common.white,
    fontSize: "1.2rem",
  },
  linkContainer: {
    [theme.breakpoints.down("md")]: {
      paddingBottom: "3rem",
    },
  },
}))
