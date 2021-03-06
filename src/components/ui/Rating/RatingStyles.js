import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  size: {
    width: ({ size }) => `${size || 2}rem`,
    height: ({ size }) => `${size || 2}rem`,
  },
}))
