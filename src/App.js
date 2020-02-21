import React, { useEffect, useMemo, memo } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import { SetWindow, CheckAppVersion } from "./redux/App/actions"
import { GetUserSettings } from "./redux/User/actions"
import { SetCalendar } from "./redux/Calendar/Calendar"
import {
  SyncEntries,
  GetUserEntries,
  GetUserEntryTags
} from "./redux/Entries/actions"
import { RouteMap } from "./routes"
import {
  Account,
  Entries,
  Home,
  Settings,
  Support,
  PageNotFound
} from "./views"
import { PrivacyPolicy } from "./components"
import { RouterLinkPush } from "./routes"
import memoizeProps from "./helpers/memoizeProps"

const FIFTEEN_MINUTES = 1000 * 60 * 15

const {
  HOME,
  ROOT,
  NEW_ENTRY,
  LOGIN,
  SIGNUP,
  PASSWORD_RESET,
  SETTINGS,
  SETTINGS_ENTRIES,
  SETTINGS_PREFERENCES,
  SETTINGS_PROFILE,
  SETTINGS_AVAILABILITY,
  SUPPORT,
  CALENDAR,
  ENTRIES,
  ENTRIES_TABLE,
  ENTRIES_MAP,
  PRIVACY_POLICY
} = RouteMap

const mapStateToProps = ({ User, Window: { navBarHeight } }) => ({
  User,
  navBarHeight
})

const mapDispatchToProps = {
  SetWindow,
  GetUserSettings,
  CheckAppVersion,
  SetCalendar,
  SyncEntries,
  GetUserEntries,
  GetUserEntryTags
}

const App = ({
  GetUserSettings,
  User,
  CheckAppVersion,
  SetWindow,
  SetCalendar,
  SyncEntries,
  GetUserEntries,
  GetUserEntryTags,
  history,
  location,
  match,
  navBarHeight
}) => {
  useEffect(() => {
    const activeDate = new Date()

    SetCalendar({ activeDate })

    CheckAppVersion()

    setInterval(() => CheckAppVersion(), FIFTEEN_MINUTES)

    const handleResize = () => SetWindow()

    window.addEventListener("resize", handleResize)

    handleResize()

    if (User.id) {
      SyncEntries(() => new Promise(resolve => resolve(GetUserEntries(1))))
      GetUserSettings()
      GetUserEntryTags()
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const renderRedirectOrComponent = (shouldRedirect, route, Component) => {
    return shouldRedirect
      ? () => <Redirect push to={RouterLinkPush(history, route)} />
      : Component
  }

  const routeItems = [
    {
      path: [ENTRIES, CALENDAR, ENTRIES_TABLE, ENTRIES_MAP],
      component: Entries
    },
    { path: [ROOT, HOME], component: Home },
    {
      path: [LOGIN, SIGNUP, PASSWORD_RESET],
      component: renderRedirectOrComponent(User.token, NEW_ENTRY, Account)
    },
    {
      path: [
        SETTINGS,
        SETTINGS_ENTRIES,
        SETTINGS_PREFERENCES,
        SETTINGS_PROFILE,
        SETTINGS_AVAILABILITY
      ],
      component: Settings
    },
    {
      path: [SUPPORT],
      component: Support
    },
    { path: [PRIVACY_POLICY], component: PrivacyPolicy }
  ]

  const renderRouteItems = useMemo(
    () =>
      routeItems.map((item, i) => {
        const { path, component } = item
        return <Route exact key={i} path={path} component={component} />
      }),
    [routeItems]
  )

  return (
    <div
      className="App RouteOverlay"
      style={{
        top: navBarHeight,
        bottom: 0
        // background: "red"
      }}
    >
      <Switch>
        {renderRouteItems}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

App.propTypes = {
  User: PropTypes.objectOf(PropTypes.any),
  navBarHeight: PropTypes.number.isRequired,
  SetWindow: PropTypes.func.isRequired,
  GetUserSettings: PropTypes.func.isRequired,
  SetCalendar: PropTypes.func.isRequired,
  SyncEntries: PropTypes.func.isRequired,
  GetUserEntries: PropTypes.func.isRequired
}

const isEqual = (prevProps, nextProps) =>
  memoizeProps(prevProps, nextProps, [
    "User",
    "routeOverlayHeight",
    "navBarHeight"
  ])

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(memo(App, isEqual))
)
