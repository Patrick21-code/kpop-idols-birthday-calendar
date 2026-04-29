'use client'

import { useMemo } from 'react'
import { getCalendarDays, getBirthdayMonthDay } from '@/lib/utils/dateUtils'
import { getMonth, getYear } from 'date-fns'
import { Idol } from '@/lib/types'


// what the hook returns for each day cell
interface CalendarDay {
    day: number | null  //null means empty cell (before day 1)
    idols: Idol[]       //idols whose birthday falls on this day
    isToday: boolean    //true if this cell is today's date
}

export function useCalendar(currentMonth: Date, filteredIdols: Idol[]): CalendarDay[] {

    // useMemo recalculates only when currentMonth or filteredIdols change
    // without it, this runs on EVERY render - wasteful
    const calendarDays = useMemo(() => {

        const cells = getCalendarDays(currentMonth)

        //needed to compare birthdays against the month being displayed
        const currentMonthIndex = getMonth(currentMonth) // 0-indexed
        const currentYear = getYear(currentMonth)

        
        const today = new Date()
        const todayDay = today.getDate()
        const todayMonth = today.getMonth()
        const todayYear = today.getFullYear()

        // map each cell (null or day number) into a CalendarDay object
        return cells.map((day) => {

            // empty cell - no idols, not today
            if (day === null) {
                return { day: null, idols: [], isToday: false}
            }

            // find all idols whose birthday falls on this exact month + day
            const idolsOnThisDay = filteredIdols.filter((idol) => {
                const { month, day: bDay } = getBirthdayMonthDay(idol.birthday)
                return month === currentMonthIndex && bDay === day
            })

            // check if this cell is today
            const isToday =
                day === todayDay &&
                currentMonthIndex === todayMonth &&
                currentYear === todayYear

            return {
                day,
                idols: idolsOnThisDay,
                isToday,
            }
        })
    
    }, [currentMonth, filteredIdols])
    //only recalculates when the dependency array change
    // each cell it scan through all idols. That's fine once - but React can re-render components many times per second.
    // Without useMemo, this runs every single render even when nothing changed.
    return calendarDays
}