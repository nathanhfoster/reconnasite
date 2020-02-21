import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Form,
  FormText,
  FormGroup,
  Input,
  ButtonGroup,
  Button
} from "reactstrap"
import { ReactDatePicker } from "../../../../components"
import { SetUserAvailabilityGeneral } from "../../../../redux/User/actions"
import { removeArrayDuplicates } from "../../../../helpers"
import { AVAILABLE_DAYS, AVAILABLE_DAYS_SHORT } from "./utils"
import "./styles.css"

const mapStateToProps = ({
  User: {
    Availability: { general }
  },
  Window: { isMobile }
}) => ({ generalAvailability: general, isMobile })

const mapDispatchToProps = { SetUserAvailabilityGeneral }

const GeneralAvailability = ({
  generalAvailability: {
    week_days,
    start_hour,
    start_minute,
    end_hour,
    end_minute
  },
  isMobile,
  SetUserAvailabilityGeneral
}) => {
  const startHour = new Date().setHours(start_hour, start_minute)

  const endHour = new Date().setHours(end_hour, end_minute)

  const startMinTime = new Date().setHours(8, 59)
  const startMaxTime = new Date().setHours(17, 0)
  const endMinTime = startHour
  const endMaxTime = new Date().setHours(17, 0)

  const handleStartTimeChange = date => {
    const start_hour = date.getHours()
    const start_minute = date.getMinutes()
    const payload = { start_hour, start_minute }
    SetUserAvailabilityGeneral(payload)

    if (date > endHour) {
      handleEndTimeChange(date)
    }
  }

  const handleEndTimeChange = date => {
    const end_hour = date.getHours()
    const end_minute = date.getMinutes()
    const payload = { end_hour, end_minute }
    SetUserAvailabilityGeneral(payload)
  }

  const handleDayChange = useCallback(
    ({ target: { id, checked } }) => {
      if (checked) {
        const uniqueDays = removeArrayDuplicates(week_days.concat(Number(id)))
        const payload = { week_days: uniqueDays }
        SetUserAvailabilityGeneral(payload)
      } else {
        const uniqueDays = week_days.filter(day => day != id)
        console.log(uniqueDays)
        const payload = { week_days: uniqueDays }
        SetUserAvailabilityGeneral(payload)
      }
    },
    [week_days]
  )

  const renderAvailableDays = useMemo(
    () =>
      (isMobile ? AVAILABLE_DAYS_SHORT : AVAILABLE_DAYS).map((day, i) => {
        const isChecked = week_days.includes(i)
        return (
          <FormGroup
            key={day}
            className="text-center"
            style={{
              border: "1px solid white",
              width: "100%"
            }}
          >
            <Input
              id={i}
              checked={isChecked}
              onChange={handleDayChange}
              type="checkbox"
              aria-label="Checkbox for following text input"
            />
            <FormText color="var(--secondaryColor)">{day}</FormText>
          </FormGroup>
        )
      }),
    [week_days, isMobile]
  )

  return (
    <Container className="GeneralAvailability Container p-0">
      <Row>
        <Col tag="h5" xs={12} className="p-0">
          Available Hours
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="p-0 form-inline">
          <ReactDatePicker
            selectsStart
            selected={startHour}
            onChange={handleStartTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeCaption="Time"
            dateFormat="h:mm aa"
            minTime={startMinTime}
            maxTime={startMaxTime}
          />

          <ReactDatePicker
            selectsEnd
            selected={endHour}
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeCaption="Time"
            dateFormat="h:mm aa"
            minTime={endMinTime}
            maxTime={endMaxTime}
          />
        </Col>
      </Row>
      <Row>
        <Col tag="h5" xs={12} className="p-0">
          Available Days
        </Col>
      </Row>
      <Row>
        <Col xs={12} tag={Form} className="form-check-inline">
          {renderAvailableDays}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ButtonGroup className="float-right">
            <Button outline color="accent" className="p-2">
              Set up later
            </Button>
            <Button color="accent" className="p-2">
              Save
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  )
}

GeneralAvailability.propTypes = {
  generalAvailability: PropTypes.object.isRequired,
  SetUserAvailabilityGeneral: PropTypes.func.isRequired
}

GeneralAvailability.defaultProps = {}

export default reduxConnect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralAvailability)
