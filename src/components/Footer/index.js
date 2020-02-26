import React, { memo } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Jumbotron } from "reactstrap"
import { Link } from "react-router-dom"
import { RouteMap } from "../../routes"
import "./styles.css"

const Footer = () => (
  <Container fluid tag="footer" className="MainFooter">
    <Row>
      <Col xs={12}>
        <Link to="/privacy-policy">
          <i className="fas fa-user-secret" /> Privacy policy
        </Link>
      </Col>
    </Row>
    <Row className="Center">
      <Col xs={12}>&copy; {new Date().getFullYear()} eScreenLogic</Col>
    </Row>
  </Container>
)

Footer.propTypes = {}

export default memo(Footer)
