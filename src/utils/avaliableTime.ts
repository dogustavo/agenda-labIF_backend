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

export const compareTimes = (a: string, b: string) => {
  const time1 = +a.split(':')[0]
  const time2 = +b.split(':')[0]

  if (time1 < time2) return false

  return true
}
