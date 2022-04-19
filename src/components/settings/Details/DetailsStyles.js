import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  phoneAdornment: {
    height: 25.122,
    width: 25.173,
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  icon: {
    marginBottom: "3rem",
  },
  fieldContainer: {
    marginBottom: "2rem",
    "& > :not(:first-child)": {
      marginLeft: "5rem",
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
