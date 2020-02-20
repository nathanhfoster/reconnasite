import React, { memo } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { RouteMap, RouterPush } from "../../../ReactRouter/Routes"
import Moment from "react-moment"
import "./styles.css"

const mapStateToProps = ({ Window: { isMobile } }) => ({ isMobile })

const EntryPreview = ({
  location,
  match,
  isMobile,
  view,
  id,
  author,
  tags,
  title,
  html,
  date_created,
  date_created_by_author,
  date_updated,
  views,
  history
}) =>
  view == "month" && !isMobile ? (
    <div className="TileContent">
      <div
        onClick={() =>
          RouterPush(
            history,
            RouteMap.ENTRY_DETAIL.replace(":entryId", `${id}`)
          )
        }
        className="hasEventsContainer"
        data-for={`${id}`}
        data-tip={id}
      >
        <i className="fas fa-circle" />
        <span className="eventDate">
          <Moment format="h:mma">{date_created_by_author}</Moment>
        </span>
        <span className="eventTitle">{title || "No title"}</span>
      </div>
    </div>
  ) : view == "month" ? (
    <i className="fas fa-circle" />
  ) : null

EntryPreview.propTypes = {
  isMobile: PropTypes.bool,
  view: PropTypes.string,
  id: PropTypes.number,
  author: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  html: PropTypes.string,
  date_created: PropTypes.string,
  date_created_by_author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  date_updated: PropTypes.string,
  views: PropTypes.number
}

export default reduxConnect(mapStateToProps, null)(memo(EntryPreview))
