import React, { memo } from "react"
import PropTypes from "prop-types"
import { RouteMap, RouterLinkPush } from "../../routes"
import { withRouter, Link } from "react-router-dom"
import "./styles.css"

const PageNotFound = ({ history, title }) => (
  <div className="central-body">
    <Link to={RouterLinkPush(history, RouteMap.HOME)} className="btn-go-home">
      GO BACK HOME
    </Link>
  </div>
)

PageNotFound.defaultProps = { title: "Page Not Found" }

export default withRouter(memo(PageNotFound))
