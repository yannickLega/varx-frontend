import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  stepContainer: {
    width: "40rem",
    height: "25rem",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  container: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "5rem",
    },
  },
  "@global": {
    ".MuiInput-underline:before": {
      borderBottom: "solid 2px #fff",
    },
    ".MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.light}`,
    },
  },
}))
