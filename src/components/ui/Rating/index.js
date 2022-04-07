import React from "react"
import RatingStyles from "./RatingStyles"

import fullStar from "../../../images/full-star.svg"
import halfStar from "../../../images/half-star.svg"
import emptyStar from "../../../images/empty-star.svg"

/**
 * This function returns a rating based on the number of stars
 * @returns An array of images.
 */
export default function Rating({ number }) {
  const classes = RatingStyles()
  const diff = 5 - Math.ceil(number)

  return (
    <>
      {[...Array(Math.floor(number))].map((e, i) => (
        <img src={fullStar} alt="full star" key={i} className={classes.size} />
      ))}
      {number % 1 !== 0 ? <img src={halfStar} alt="half star" /> : null}
      {[...Array(diff)].map((e, i) => (
        <img src={emptyStar} alt="empty star" key={`${i}-empty`} />
      ))}
    </>
  )
}
