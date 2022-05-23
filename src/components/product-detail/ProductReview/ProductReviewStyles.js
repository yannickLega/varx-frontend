import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  review: {
    marginBottom: "3rem",
  },
  light: {
    color: theme.palette.primary.main,
  },
  date: {
    marginTop: "-0.5rem",
  },
  rating: {
    cursor: "pointer",
  },
  buttonContainer: {
    marginTop: "1rem",
  },
  reviewButtonText: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  cancelButtonText: {
    color: theme.palette.primary.main,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    marginLeft: "0.5rem",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: `solid 2px ${theme.palette.primary.main}`,
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.light}`,
    },
  },
}))
