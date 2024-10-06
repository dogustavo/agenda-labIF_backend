export const generateAvaliabilityTimes = (
  init: string,
  end: string
) => {
  const availableTimes = []
  const availableFrom = init.split(':')[0]
  const availableTo = end.split(':')[0]

  for (
    let hour = Number(availableFrom);
    hour <= Number(availableTo);
    hour++
  ) {
    availableTimes.push(`${String(hour).padStart(2, '0')}:00`)
  }

  return availableTimes
}

export const compareTimes = (
  a: string,
  b: string,
  allowEqual: boolean = false
) => {
  const time1 = +a.split(':')[0]
  const time2 = +b.split(':')[0]

  if (allowEqual) {
    return time1 <= time2
  }

  return time1 < time2
}

export const compareInitTime = (a: string, b: string) => {
  const time1 = +a.split(':')[0]
  const time2 = +b.split(':')[0]

  return time1 >= time2
}

export const compareEndTime = (
  lastAvailableTime: string,
  selectedEndTime: string,
  selectedInitTime: string
) => {
  const lastAvailableHour = +lastAvailableTime.split(':')[0]
  const selectedEndHour = +selectedEndTime.split(':')[0]
  const selectedInitHour = +selectedInitTime.split(':')[0]

  if (selectedEndHour <= selectedInitHour) return false

  if (selectedEndHour > lastAvailableHour + 1) return false

  return true
}
