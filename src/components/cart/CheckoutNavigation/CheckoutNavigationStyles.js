import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  navBar: {
    backgroundColor: theme.palette.secondary.main,
    width: "40rem",
    height: "5rem",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  back: {
    visibility: ({ steps, selectedStep }) =>
      selectedStep === 0 || selectedStep === steps.length - 1
        ? "hidden"
        : "visible",
  },
  forward: {
    visibility: ({ steps, selectedStep }) =>
      selectedStep >= steps.length - 2 ? "hidden" : "visible",
  },
  disabled: {
    opacity: 0.2,
  },
  icon: {
    width: "2.25rem",
    height: "2.25rem",
    [theme.breakpoints.down("xs")]: {
      width: "1.75rem",
      height: "1.75rem",
    },
  },
  delete: {
    width: "2rem",
    height: "2rem",
    [theme.breakpoints.down("xs")]: {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
  actions: {
    position: "absolute",
    right: 0,
  },
  iconButton: {
    [theme.breakpoints.down("xs")]: {
      padding: 6,
    },
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  navButtons: {
    [theme.breakpoints.down("xs")]: {
      width: "1.5rem",
      height: "1.5rem",
      minWidth: 0,
    },
  },
}))
