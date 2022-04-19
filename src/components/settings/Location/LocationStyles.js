import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  icon: {
    marginBottom: "3rem",
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
  },
}))
