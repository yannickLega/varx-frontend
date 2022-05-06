import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  detailsButton: {
    padding: "0.25rem 0",
    textTransform: "none",
  },
  order: {
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  shopText: {
    fontSize: "2rem",
    fontWeight: 600,
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  container: {
    height: "100%",
    position: "relative",
  },
  shopWrapper: {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
  },
  icon: {
    marginTop: "-3rem",
  },
  detailsText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
}))
