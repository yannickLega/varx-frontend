import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: "45rem",
    width: "35rem",
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: "35rem",
    width: "45rem",
    position: "absolute",
  },
  icon: {
    height: "3rem",
    width: "3rem",
    margin: "1rem",
  },
  sectionContainer: {
    height: "calc(100% / 3)",
  },
  detailsContainer: {
    padding: "1rem",
  },
  descriptionContainer: {
    backgroundColor: theme.palette.primary.dark,
    overflowY: "auto",
    padding: "1rem",
  },
  actionsContainer: {
    padding: "0 1rem",
  },
  chipContainer: {
    marginTop: "1rem",
  },
  chipRoot: {
    height: "3rem",
    width: "8rem",
    borderRadius: 50,
  },
  chipLabel: {
    fontSize: "1.5rem",
  },
  name: {
    color: theme.palette.common.white,
  },
  reviewButton: {
    textTransform: "none",
  },
  stock: {
    color: theme.palette.common.white,
  },
  sizesAndSwatches: {
    maxWidth: "11rem",
  },
  "@global": {
    ".MuiButtonGroup-groupedOutlinedVertical:not(:first-child)": {
      marginTop: 0,
    },
  },
}))
