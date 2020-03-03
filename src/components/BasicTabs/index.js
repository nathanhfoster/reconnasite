import React, { useState, useEffect, useRef, useMemo, memo } from "react"
import PropTypes from "prop-types"
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import "./styles.css"

const getInitialState = (activeTab, defaultTab, tabs) => {
  let firstTabId = null

  if (tabs.length > 0) {
    firstTabId = tabs[0].tabId
  }

  return defaultTab || activeTab || firstTabId
}

const BasicTabs = ({ className, defaultTab, fluid, tabs, ...restOfProps }) => {
  const [activeTab, setState] = useState(
    getInitialState(restOfProps.activeTab, defaultTab, tabs)
  )

  const mounted = useRef()

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      setState(restOfProps.activeTab)
    }
  }, [restOfProps.activeTab])

  const handleTabChanged = activeTab => setState(activeTab)

  const renderNavItems = useMemo(
    () =>
      tabs.map(tab => {
        const { tabId, title, onClickCallback } = tab
        const onTab = activeTab === tabId
        return (
          <NavItem key={tabId}>
            <NavLink
              className={`BasicTabsNavLink p-2 px-sm-3 py-sm-2 ${
                onTab ? "active" : ""
              }`}
              onClick={() =>
                onClickCallback
                  ? onClickCallback(tabId)
                  : handleTabChanged(tabId)
              }
            >
              {title}
            </NavLink>
          </NavItem>
        )
      }),
    [activeTab, tabs]
  )

  const renderTabs = useMemo(
    () =>
      tabs.map(tab => {
        const { tabId, render, mountTabOnlyWhenActive, className } = tab
        const shouldNotRender =
          mountTabOnlyWhenActive === true && activeTab !== tabId
        return shouldNotRender ? null : (
          <TabContent key={tabId} activeTab={activeTab} className={className}>
            <TabPane tabId={tabId}>{render}</TabPane>
          </TabContent>
        )
      }),
    [activeTab, tabs]
  )

  return (
    <Container fluid={fluid} className={`${className} Container`}>
      <Row>
        <Col tag={Nav} tabs xs={12}>
          {renderNavItems}
        </Col>
      </Row>
      {renderTabs}
    </Container>
  )
}

BasicTabs.propTypes = {
  className: PropTypes.string,
  defaultTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      mountTabOnlyWhenActive: PropTypes.bool,
      title: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object
      ]),
      render: PropTypes.object.isRequired,
      onClickCallback: PropTypes.func
    }).isRequired
  )
}

BasicTabs.defaultProps = {
  className: "BasicTabs",
  fluid: false,
  tabs: [
    { tabId: 1, title: "1", render: <div>Tab 1</div> },
    { tabId: 2, title: "2", render: <div>Tab 2</div> },
    { tabId: 3, title: "3", render: <div>Tab 3</div> }
  ]
}

export default memo(BasicTabs)
