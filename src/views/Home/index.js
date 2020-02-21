import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, ButtonGroup, Button } from "reactstrap"
import { AddToHomeScreen, BasicCard, Footer } from "../../components"
import { RouteMap, RouterPush } from "../../routes"
import { connect as reduxConnect } from "react-redux"
import { useHistory } from "react-router-dom"
import {
  Bell,
  CloudDownload,
  ListOl,
  Mobile,
  MoneyBill,
  PhoneLaptop,
  ShieldCheck,
  UserHeadset,
  WifiSlash
} from "../../images/SVG"
import "./styles.css"

const mapStateToProps = ({ User: { id } }) => ({ userId: id })

const renderFeatures = features =>
  features.map((feature, i) => (
    <Col key={i} md={4} sm={6} xs={12}>
      <BasicCard cardHeaderClassName="Center" {...feature} />
    </Col>
  ))

const Home = ({ userId }) => {
  const history = useHistory()
  const features = [
    {
      title: "Installable",
      text:
        "Install this app to your device just like you would in an app store",
      faIcon: "fas fa-download",
      button: <AddToHomeScreen />
    },
    {
      title: "Sync",
      text: "Automatically sync your data across all devices",
      faIcon: "fas fa-sync-alt",
      button: (
        <Button
          color="accent"
          onClick={() => RouterPush(history, RouteMap.SIGNUP)}
          disabled={userId ? true : false}
        >
          Sign Up
        </Button>
      )
    },
    {
      title: "Notifications",
      text: "Get personalized notifications when a recon becomes available",
      header: <Bell className="AboutFeatureImage" />,
      button: (
        <Button
          color="accent"
          onClick={() => RouterPush(history, RouteMap.SETTINGS)}
        >
          Comming Soon
        </Button>
      )
    },
    {
      title: "Offline",
      text: "Doesn't require an internet connection",
      header: <WifiSlash className="AboutFeatureImage" />,
      button: (
        <Button
          color="accent"
          onClick={() => RouterPush(history, RouteMap.SETTINGS)}
        >
          Go Offline
        </Button>
      )
    },
    {
      title: "Support",
      text: "World class support",
      header: <UserHeadset className="AboutFeatureImage" />,
      button: (
        <Button
          color="accent"
          onClick={() => RouterPush(history, RouteMap.SUPPORT)}
        >
          Support Page
        </Button>
      )
    },
    {
      title: "Easy",
      text: "You will be guided through your site reconnaissance step by step ",
      header: <ListOl className="AboutFeatureImage" />
    },
    {
      title: "Get Paid",
      text: "Get paid after sucessfully completing a recon",
      header: <MoneyBill className="AboutFeatureImage" />
    },
    {
      title: "Linkable",
      text: "Share any public view you want with your friends and family",
      faIcon: "fas fa-link"
    },
    {
      title: "Responsive",
      text: "UI fits the screen dimensions of any device",
      header: <PhoneLaptop className="AboutFeatureImage" />
    },
    {
      title: "Fresh",
      text: "Always get the latest verision of the app",
      header: <CloudDownload className="AboutFeatureImage" />
    },
    {
      title: "App-like",
      text: "Looks and interacts like a native app",
      header: <Mobile className="AboutFeatureImage" />
    },
    {
      title: "Secure",
      text: "Always served over HTTPS",
      header: <ShieldCheck className="AboutFeatureImage" />
    }
  ]

  return (
    <Container tag="article" className="Home Container">
      <Row className="Center">
        <Col xs={12} className="mt-3">
          <h1 className="HeaderTitle">Reconnasite</h1>
        </Col>
        <Col xs={12}>
          <h4 className="SubHeaderTitle">
            Get paid to survey commercial properties
          </h4>
        </Col>
      </Row>
      <Row>{renderFeatures(features)}</Row>
      <hr style={{ height: 40 }} />
      <Footer />
    </Container>
  )
}

Home.propTypes = {
  userId: PropTypes.number
}

export default reduxConnect(mapStateToProps)(Home)
