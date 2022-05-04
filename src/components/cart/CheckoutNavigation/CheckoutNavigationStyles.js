import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  navBar: {
    backgroundColor: theme.palette.secondary.main,
    width: "40rem",
    height: "5rem",
    position: "relative",
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
  },
  delete: {
    width: "1.9rem",
    height: "1.9rem",
  },
  actions: {
    position: "absolute",
    right: 0,
  },
}))
