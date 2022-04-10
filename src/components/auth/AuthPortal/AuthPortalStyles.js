import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  container: {
    marginBottom: "8rem",
  },
  paper: {
    border: `2rem solid ${theme.palette.secondary.main}`,
    width: "50rem",
    height: "40rem",
    borderRadius: 0,
  },
  inner: {
    border: `2rem solid ${theme.palette.primary.main}`,
    width: "100%",
    height: "40rem",
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: `solid 2px ${theme.palette.secondary.main}`,
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
}))
