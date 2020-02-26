import React, { useCallback, useMemo, Fragment } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { Container, Row, Col } from "reactstrap"
import { Header, ReactDatePicker } from "../../../components"
import GeneralAvailability from "./GeneralAvailability"
import SpecificAvailability from "./SpecificAvailability"
import "./styles.css"

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {}

const Availability = ({}) => {
  const sections = [
    { title: "General", render: <GeneralAvailability /> },
    { title: "Specific", render: <SpecificAvailability /> }
  ]
  const renderSections = useMemo(
    () =>
      sections.map(({ title, render }) => (
        <Fragment>
          <Row className="AvailabilityRow">
            <Col xs={12} className="px-1">
              <Header fill={false}>{title}</Header>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="p-1">
              {render}
            </Col>
          </Row>
        </Fragment>
      )),
    [sections]
  )
  return (
    <Container fluid className="p-0">
      {renderSections}
    </Container>
  )
}

Availability.propTypes = {}

Availability.defaultProps = {}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Availability)
