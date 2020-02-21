import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { Container, Row, Col } from "reactstrap"
import { BasicTabs } from "../../../components"
import GeneralAvailability from "./GeneralAvailability"

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {}

const Availability = ({}) => {
  const tabs = [
    {
      title: "General",
      render: <GeneralAvailability />
    }
  ]
  return <BasicTabs containerClassname="p-0" tabs={tabs} />
}

Availability.propTypes = {}

Availability.defaultProps = {}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Availability)
