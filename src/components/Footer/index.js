import React, { memo } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Jumbotron } from "reactstrap"
import { Link } from "react-router-dom"
import { RouteMap } from "../../routes"
import "./styles.css"

const Footer = () => (
  <Container
    fluid
    tag="footer"
    className="MainFooter"
    // onEntering={setStatus("Opening")}
    // onEntered={setStatus("Opened")}
    // onExiting={setStatus("Closing")}
    // onExited={setStatus("Closed")}
  >
    <Row className="Center">
      <Col>&copy; {new Date().getFullYear()} eScreenLogic</Col>
    </Row>
    <Row>
      <Col>
        <Link to="/privacy-policy">
          <i className="fas fa-user-secret" /> Privacy policy
        </Link>
      </Col>
    </Row>
  </Container>
)

Footer.propTypes = {}

export default memo(Footer)
