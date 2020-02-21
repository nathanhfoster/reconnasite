import React, { useState } from "react"
import { connect as reduxConnect } from "react-redux"
import { RouteMap } from "../ReactRouter/Routes"
import PropTypes from "prop-types"
import "./styles.css"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import AppSearch from "../AppSearch"
import { GetUserEntriesByDate } from "../../redux/Entries/actions"
import { UserLogout } from "../../redux/User/actions"
import Hamburger from "./Hamburger"
import NavItemLink from "./NavItemLink"

const {
  HOME,
  NEW_ENTRY,
  CALENDAR,
  ENTRIES_DETAILED,
  ENTRIES_MINIMAL,
  ENTRIES_TABLE,
  ENTRIES_MAP,
  ENTRIES_CARDS,
  LOGIN,
  SETTINGS,
  SETTINGS_PROFILE,
  SETTINGS_PREFERENCES,
  SETTINGS_AVAILABILITY,
  SUPPORT,
  PRIVACY_POLICY
} = RouteMap

const mapStateToProps = ({
  User: { id },
  Window: { isMobile, isInStandalone }
}) => ({
  UserId: id,
  isMobile,
  isInStandalone
})

const mapDispatchToProps = { UserLogout, GetUserEntriesByDate }

const NavBar = ({ UserId, isInStandalone, isMobile, UserLogout }) => {
  const [collapsed, setCollapse] = useState(true)

  const navLinks = [
    {
      route: HOME,
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-home NavBarImage" />
          HOME
        </span>
      )
    },
    {
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-building NavBarImage" />
          Site
        </span>
      ),
      links: [
        {
          dropdownItem: true,
          route: CALENDAR,
          title: "CALENDAR",
          icon: <i className="fas fa-calendar-alt NavBarImage" />
        },
        {
          dropdownItem: true,
          route: ENTRIES_TABLE,
          title: "TABLE",
          icon: <i className="fas fa-table NavBarImage" />
        },
        {
          dropdownItem: true,
          route: ENTRIES_MAP,
          title: "MAP",
          icon: <i className="fas fa-map-marked-alt NavBarImage" />
        }
      ]
    },
    {
      route: LOGIN,
      title: UserId ? "LOGOUT" : "LOGIN",
      icon: (
        <i className={`fas fa-sign-${UserId ? "out" : "in"}-alt NavBarImage`} />
      ),
      onClick: UserId ? UserLogout : null
    },

    {
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-ellipsis-v NavBarImage" />
        </span>
      ),
      links: [
        {
          icon: (
            <span className="NavBarLink">
              <i className="fas fa-cog NavBarImage" />
              SETTINGS
            </span>
          ),
          links: [
            {
              dropdownItem: true,
              route: SETTINGS_PROFILE,
              title: "PROFILE",
              icon: <i className="fas fa-user-circle NavBarImage" />
            },
            {
              dropdownItem: true,
              route: SETTINGS_PREFERENCES,
              title: "PREFERENCES",
              icon: <i className="fas fa-sliders-h NavBarImage" />
            },
            {
              dropdownItem: true,
              route: SETTINGS_AVAILABILITY,
              title: "AVAILABILITY",
              icon: <i className="fas fa-calendar-alt NavBarImage" />
            }
          ]
        },
        {
          dropdownItem: true,
          route: SUPPORT,
          title: "SUPPORT",
          icon: <i className="fas fa-satellite NavBarImage" />
        },
        {
          dropdownItem: true,
          route: PRIVACY_POLICY,
          title: "PRIVACY POLICY",
          icon: <i className="fas fa-user-secret NavBarImage" />
        }
      ]
    }
  ]

  const toggleHamburgerMenu = () => setCollapse(!collapsed)

  const closeHamburgerMenu = () => setCollapse(true)

  const renderDropDownMenu = (key, icon, links) => (
    <UncontrolledDropdown key={key} nav inNavbar>
      <DropdownToggle nav caret>
        {icon}
      </DropdownToggle>
      <DropdownMenu right>{renderNavLinks(links)}</DropdownMenu>
    </UncontrolledDropdown>
  )

  const renderNavLinks = navLinks =>
    navLinks.map((link, i) =>
      link.links ? (
        renderDropDownMenu(`Dropdown-${i}`, link.icon, link.links)
      ) : (
        <NavItemLink key={i} {...link} onClickCallback={closeHamburgerMenu} />
      )
    )

  return (
    <Navbar className="NavBar" fixed="top" expand="md">
      {isMobile && (
        <NavbarToggler
          tag={Hamburger}
          onClick={toggleHamburgerMenu}
          collapsed={collapsed}
        />
      )}

      <AppSearch />

      <Collapse isOpen={!collapsed} navbar>
        <Nav className="ml-auto" navbar>
          {renderNavLinks(navLinks)}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

Navbar.propTypes = {
  UserId: PropTypes.number,
  UserLogout: PropTypes.func
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar)
