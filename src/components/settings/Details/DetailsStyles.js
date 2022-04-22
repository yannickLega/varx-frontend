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
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem",
    },
  },
  fieldContainer: {
    marginBottom: "2rem",
    "& > :not(:first-child)": {
      marginLeft: "5rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem",
      "& > :not(:first-child)": {
        marginLeft: 0,
        marginTop: "1rem",
      },
    },
  },
  detailsContainer: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      borderBottom: `4px solid ${theme.palette.common.white}`,
      height: "35rem",
    },
  },
  slotsContainer: {
    position: "absolute",
    bottom: 0,
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
