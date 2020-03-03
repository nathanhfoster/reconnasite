import React, { Fragment, memo } from "react"
import PropTypes from "prop-types"
import { ViewPortContainer } from ".."
import { useLocation } from "react-router-dom"
import { RouteMap } from "../../routes"
import "./styles.css"

const backgroundImageRouteMap = route => {
  switch (route) {
    case RouteMap.HOME:
      return null
    default:
      return null
  }
}

const BackgroundImage = () => {
  const { pathname } = useLocation()
  const background = backgroundImageRouteMap(pathname)

  return (
    <Fragment>
      <ViewPortContainer className="BackgroundImage">
        {/* <Media src={bgImage} /> */}
      </ViewPortContainer>
      {background}
    </Fragment>
  )
}
export default memo(BackgroundImage)
