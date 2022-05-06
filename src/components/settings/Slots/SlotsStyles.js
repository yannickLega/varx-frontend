import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  slotWrappers: {
    marginLeft: "1rem",
    marginBottom: "1rem",
    "& > :not(:first-child)": {
      marginLeft: "-0.5rem",
    },
  },
  slot: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 25,
    width: "2.5rem",
    height: "2.5rem",
    minWidth: 0,
    border: `0.15rem solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    [theme.breakpoints.down("xs")]: {
      width: ({ checkout }) => (checkout ? "2rem" : "2.5rem"),
      height: ({ checkout }) => (checkout ? "2rem" : "2.5rem"),
    },
  },
  slotText: {
    color: theme.palette.secondary.main,
    marginLeft: "-0.25rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: ({ checkout }) => (checkout ? "1.5rem" : undefined),
    },
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  selectedText: {
    color: theme.palette.common.white,
  },
  shipping: {
    color: theme.palette.common.white,
    fontWeight: 600,
    marginLeft: "0.5rem",
    marginTop: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      marginTop: "0.4rem",
    },
  },
}))
