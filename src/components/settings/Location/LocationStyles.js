import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  icon: {
    marginBottom: "3rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem",
    },
  },
  chipWrapper: {
    marginTop: "2rem",
    marginBottom: "3rem",
  },
  fieldContainer: {
    "& > :not(:first-child)": {
      marginTop: "2rem",
    },
  },
  slotsContainer: {
    position: "absolute",
    bottom: 0,
  },
  locationContainer: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      borderBottom: `4px solid ${theme.palette.common.white}`,
      height: "35rem",
    },
  },
}))
