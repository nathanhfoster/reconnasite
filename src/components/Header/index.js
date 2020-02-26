import React, { memo } from "react"
import PropTypes from "prop-types"
import "./styles.css"

const Header = ({ children, className, fill, color, ...restOfProps }) => {
  const styles = {
    backgroundColor: fill,
    color,
    ...restOfProps
  }

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  )
}
Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  className: PropTypes.string.isRequired,
  fill: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Header.defaultProps = {
  children: <h1>Header</h1>,
  className: "Header p-2",
  fill: "var(--primaryColor)",
  color: "var(--secondaryColor)",
  fontSize: "3em"
}

export default memo(Header)
