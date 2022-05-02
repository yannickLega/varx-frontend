import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  navBar: {
    backgroundColor: theme.palette.secondary.main,
    width: "40rem",
    height: "5rem",
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
}))
