import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  size: {
    color: theme.palette.common.white,
  },
  button: {
    border: `2px solid ${theme.palette.common.white}`,
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    minWidth: 0,
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))
