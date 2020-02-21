import MomentJs from "moment"

const AVAILABLE_DAYS = [
  "Sundays",
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays"
]

const getAvailableHours = (
  starthour = 9,
  startMinute = 0,
  endHour = 17,
  endMinute = 0,
  minuteIncrement = 15
) => {
  var timeStops = []

  var startTime = MomentJs()
    .hour(starthour)
    .minute(startMinute)

  while (startTime.hour() < endHour || startTime.minute() <= endMinute) {
    timeStops.push(new MomentJs(startTime))
    startTime.add("m", minuteIncrement)
  }

  return timeStops
}

const AVAILABLE_HOURS = getAvailableHours().map((e, i) => ({
  id: `${e.hour()}:${e.minute()}`,
  value: e.format("hh:mma")
}))

export { AVAILABLE_DAYS, AVAILABLE_HOURS }
