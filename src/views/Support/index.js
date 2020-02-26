import React, { memo } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Button } from "reactstrap"
import { BasicCard } from "../../components"
import { UserHeadset } from "../../images/SVG"
import "./styles.css"

const renderSupportCards = supportCards =>
  supportCards.map((supportCard, i) => (
    <Col key={i} xs={12} sm={6} md={4} className="pt-3 pt-sm-4">
      <BasicCard cardHeaderClassName="Center" {...supportCard} />
    </Col>
  ))

const Support = () => {
  const supportCards = [
    {
      title: "Contact Us",
      text: "Open to feature suggestions, bug reports, or conversation!",
      faIcon: "fas fa-envelope",
      button: (
        <Button
          color="accent"
          tag="a"
          href="mailto:support@escreenlogic.com?subject=Reconnasite%20Support"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@escreenlogic.com
        </Button>
      )
    }
  ]
  return (
    <Container tag="article" className="Support Container">
      <Row>
        <Col xs={12} className="Center">
          <UserHeadset />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="Center">
          <h1>Support</h1>
        </Col>
      </Row>
      <Row>{renderSupportCards(supportCards)}</Row>
    </Container>
  )
}

export default memo(Support)
