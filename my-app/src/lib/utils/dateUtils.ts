// date-fns gives us reliable date math
// never do date math manually - timezones and leap years will break you

import {
  differenceInCalendarDays,
  setYear,
  isToday,
  addYears,
  getYear,
  getMonth,
  getDate,
  getDaysInMonth,
  startOfMonth,
  getDay,
} from 'date-fns'

// -----------------
// getNextBirthday
// -----------------
// given a birthday string like "1997-03-27"
// returns the next upcoming Date that birthday lands on
// if the birthday already passed this year, return next year's date
// if it's today, returns today

export function getNextBirthday(birthday: string) : Date {
    const today = new Date()

    // parse the birthday string into parts
    const [, monthStr, dayStr] = birthday.split('-') //splits the string into an array. Ex: "1997-03-27" = ["1997", "03", "27"]
    const month = parseInt(monthStr, 10) - 1 // Date months are 0-indexed (Jan = 0). parseInt() takes a string and converts it into an integer
    const day = parseInt(dayStr, 10)

    // try this year first
    const thisYear = getYear(today)
    let next = new Date(thisYear, month, day)
   
    // if that date has already passed (and isn't today), use next year
    // reason why it's <. Ex: today is april 28, but the birthday is march 27. March 27 is less than april 28
    if (next < today && !isToday(next)) {
      next = new Date(thisYear + 1, month, day)
    }

    return next
}

// -----------------
// getDaysUntilBirthday
// -----------------
// returns how many days until the next birthday
// returns 0 if today is their birthday

export function getDaysUntilBirthday(birthday: string): number {
  const today = new Date()
  const next = getNextBirthday(birthday)

  return differenceInCalendarDays(next, today)
}

// -----------------
// isBirthdayToday
// -----------------
// returns true if the idol's birthday is today (ignores year)

export function isBirthdayToday(birthday: string): boolean {
  const today = new Date()
  const [, monthStr, dayStr] = birthday.split('-')
  const month = parseInt(monthStr, 10) - 1
  const day = parseInt(dayStr, 10)

  return today.getMonth() === month && today.getDate() === day

  //getDate() returns the day of the month(1-31)
  //getDay() returns the day of the week(0-6, where 0 = sunday, 1 = monday, etc)
}

// -----------------
// getCountdownParts
// -----------------
// returns the dd // hh // mm / ss breakdown for the live countdown.
// this is what power the ticking timer boxes in CountdownCard

export function getCountdownParts(birthday: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
} {
  const now = new Date()
  const next = getNextBirthday(birthday)

  // total milliseconds remaining
  const totalMs = next.getTime() - now.getTime()

  // if it's today (0 or negative ms), return all zeros
  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0}
  }

  // break milliseconds down into human units
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  //(totalMs % (1000 * 60 * 60 * 24)) strips away the full days, leaving only the leftover milliseconds
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))
  //(totalMs % (1000 * 60 * 60)) strips away all the full hours
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000)
  //(totalMs % (1000 * 60)) strips away all the full minutes
  return { days, hours, minutes, seconds }
}

// -----------------
// getAge
// -----------------
// returns how the idol will be on their next birthday

export function getAge(birthday: string): number {
  const [yearStr] = birthday.split('-') //1997. take the first element of the array
  const birthYear = parseInt(yearStr, 10) 
  const next = getNextBirthday(birthday)
  return getYear(next) - birthYear
}

// -----------------
// getBirthdayMonth
// -----------------
// returns the month (0-indexed) and day of a birthday string
// used by the calendar to place idols on the right day cell

export function getBirthdayMonthDay(birthday: string): {
  month: number // 0-indexed (jan = 0, dec = 11)
  day: number
} {
  const [, monthStr, dayStr] = birthday.split('-')
  return {
    month: parseInt(monthStr, 10) - 1,
    day: parseInt(dayStr, 10),
  }
}

// -----------------
// getCalendarDays
// -----------------
// given a date, return an array representive every cell
// in the monthly calendar grid (including empty leading cells)
// each cell is either null (empty) or a day number

// example for april 2026
// april 1 is a wednesday (index 3), so cells 0-2 are null
// [null, null, null, 1, 2, 3, 4, 5, ...]

export function getCalendarDays(date: Date): (number | null) [] {
  const firstDay = startOfMonth(date)
  const startIndex = getDay(firstDay)
  const totalDays = getDaysInMonth(date)

  const cells: (number | null)[] = []

  // fill leading empty cells before day 1
  for (let i = 0; i < startIndex ; i++) {
    cells.push(null)
  }

  // fill actual day numbers
  for (let d = 1; d <= totalDays; d++) {
    cells.push(d)
  }

  return cells
}
