import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  productImage: {
    height: "8rem",
    width: "8rem",
  },
  name: {
    color: theme.palette.secondary.main,
  },
  id: {
    color: theme.palette.secondary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
    },
  },
  actionWrapper: {
    height: "2rem",
    width: "2rem",
    marginBottom: -8,
  },
  infoContainer: {
    position: "relative",
    height: "8rem",
    marginLeft: "1rem",
    width: "35rem",
  },
  chipWrapper: {
    position: "absolute",
    top: "3.5rem",
  },
  itemContainer: {
    margin: "2rem 0 2rem 2rem",
    [theme.breakpoints.down("md")]: {
      margin: "2rem 0",
    },
  },
  actionButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "12px 6px",
    },
  },
}))
