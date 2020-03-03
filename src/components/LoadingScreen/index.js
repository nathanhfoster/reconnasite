import React, { memo } from "react"
import { ViewPortContainer } from ".."
import "./styles.css"

const LoadingScreen = () => (
  <ViewPortContainer className="LoadingScreenContainer">
    <div className="loader Center">Loading...</div>
  </ViewPortContainer>
)

export default memo(LoadingScreen)
