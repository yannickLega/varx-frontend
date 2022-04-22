import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  coloredIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  logoContainer: {
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
    },
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
  logoText: {
    color: theme.palette.common.offBlack,
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 500,
  },
  icon: {
    height: "2rem",
    width: "2rem",
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    color: theme.palette.common.white,
  },
  badge: {
    fontSize: "1rem",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    minWidth: 0,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
      height: "1.1rem",
      width: "1.1rem",
      minWidth: 0,
    },
  },
}))
