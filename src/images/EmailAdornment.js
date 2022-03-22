import React from "react"

//destructure les props
function Icon({ color }) {
  return (
    //rendre le svg proportionable avec viewBox voir doc pour les 2 premiers paramètres ensuite width et height qui servent de base
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 17">
      <g
        // utilise la couleur passée en props, sinon utilise la couleur par défaut
        stroke={color || "#708670"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(-47 -148)"
      >
        <rect
          width="20"
          height="15"
          fill="rgba(0,0,0,0)"
          rx="2"
          transform="translate(48 149)"
        ></rect>
        <path fill="none" d="M50.984 151.833l7.012 5.454 7.012-5.454"></path>
      </g>
    </svg>
  )
}

export default Icon
