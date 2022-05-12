import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  spacer: {
    minHeight: "10rem",
  },
  drawer: {
    height: "100%",
    width: "30rem",
    backgroundColor: "transparent",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  id: {
    fontSize: "2rem",
    fontWeight: 600,
    marginTop: "1rem",
    marginLeft: "1rem",
  },
  bold: {
    fontWeight: 600,
  },
  date: {
    fontWeight: 600,
    marginLeft: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  padding: {
    padding: "1rem",
  },
  status: {
    marginLeft: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  dark: {
    backgroundColor: theme.palette.secondary.main,
  },
  light: {
    backgroundColor: theme.palette.primary.main,
  },
  prices: {
    padding: "0.5rem 1rem",
  },
}))
