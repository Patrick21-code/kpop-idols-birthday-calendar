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

