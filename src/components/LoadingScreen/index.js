import React, { memo } from "react"
import "./styles.css"

const LoadingScreen = ({ title = "Loading..." }) => (
  <div className="LoadingScreenContainer">
    <div className="loader Center">{title}</div>
  </div>
)

export default memo(LoadingScreen)
