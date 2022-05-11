import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  numberWrapper: {
    marginBottom: "5rem",
  },
  number: {
    color: theme.palette.common.white,
    marginBottom: "5rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: ({ checkout }) => (checkout ? "1rem" : undefined),
      fontSize: ({ checkout }) => (checkout ? "1.5rem" : undefined),
    },
  },
  removeCard: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: "2rem",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: ({ checkout }) => (checkout ? 0 : undefined),
    },
  },
  removeCardText: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
    fontFamily: "Philosopher",
    fontStyle: "italic",
  },
  icon: {
    marginBottom: "3rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: ({ checkout }) => (checkout ? "3rem" : "1rem"),
    },
  },
  paymentsContainer: {
    display: ({ selectedStep, stepNumber, checkout }) =>
      checkout && selectedStep !== stepNumber ? "none" : "flex",
    position: "relative",
    borderLeft: ({ checkout }) =>
      checkout ? 0 : `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down("md")]: {
      borderLeft: 0,
      height: "35rem",
    },
  },
  slotsContainer: {
    position: "absolute",
    bottom: ({ checkout }) => (checkout ? -8 : 0),
  },
  switchWrapper: {
    marginRight: 4,
  },
  switchLabel: {
    color: theme.palette.common.white,
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.25rem",
    },
  },
  form: {
    width: "75%",
    borderBottom: "2px solid #fff",
    height: "2rem",
    marginTop: "-1rem",
    [theme.breakpoints.down("xs")]: {
      width: "85%",
    },
  },
  spinner: {
    marginLeft: "3rem",
  },
  switchItem: {
    width: "100%",
  },
}))
