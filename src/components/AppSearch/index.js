import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"
import { connect as reduxConnect } from "react-redux"
import { Link } from "react-router-dom"
import { RouteMap } from "../../routes"
import { SearchUserEntries } from "../../redux/Entries/actions"
import UseDebounce from "../UseDebounce"
import LogoImage from "../../images/Logo.png"
import "./styles.css"

const mapStateToProps = ({ Entries: { search }, Window: { isMobile } }) => ({
  isMobile,
  search
})

const mapDispatchToProps = { SearchUserEntries }

const AppSearch = ({ search, SearchUserEntries, isMobile }) => {
  const previousPropSearch = useRef(search)
  const isTyping = useRef(false)
  const [searchValue, setSearch] = useState(search)

  const shouldDeriveStateFromProps =
    !isTyping.current &&
    previousPropSearch.current !== search &&
    search !== searchValue

  const handleSearch = ({ target: { value } }) => {
    isTyping.current = true
    setSearch(value)
  }

  useEffect(() => {
    if (shouldDeriveStateFromProps) {
      setSearch(search)
    }
    return () => {
      isTyping.current = false
    }
  })

  return (
    <InputGroup
      className="AppSearch"
      style={{ maxWidth: isMobile ? "calc(100% - 52px)" : 360 }}
    >
      <InputGroupAddon addonType="prepend" className="LogoIconContainer Center">
        <InputGroupText tag={Link} to={RouteMap.HOME}>
          <img src={LogoImage} height={32} />
        </InputGroupText>
      </InputGroupAddon>

      <Input
        value={searchValue}
        placeholder="Search..."
        className="p-0"
        onChange={handleSearch}
      />
      <UseDebounce onChangeCallback={SearchUserEntries} value={searchValue} />
    </InputGroup>
  )
}

AppSearch.propTypes = {
  search: PropTypes.string,
  isMobile: PropTypes.bool,
  SearchUserEntries: PropTypes.func.isRequired
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(AppSearch)
