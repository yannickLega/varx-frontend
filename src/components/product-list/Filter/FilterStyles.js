import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  mainContainer: {
    padding: "1rem 0",
  },
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0.5rem",
  },
  chipLabel: {
    ...theme.typography.body1,
    color: theme.palette.common.white,
    fontWeight: 500,
  },
  checkbox: {
    color: theme.palette.common.white,
  },
}))
