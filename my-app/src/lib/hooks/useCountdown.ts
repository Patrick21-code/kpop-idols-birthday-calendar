'use client'

import { useState, useEffect } from 'react'
import { getCountdownParts } from '@/lib/utils/dateUtils'

// this is the shape of what the hook returns
interface CountdownParts {
    days: number
    hours: number
    minutes: number
    seconds: number
}

// the hook takes a birthday string and returns live countdown parts
export function useCountdown(birthday: string): CountdownParts {

    //useState stores the current coundown value

    //the <CountdownParts> is a generic - you're telling typescript what type of data this state holds
    const [parts, setParts] = useState<CountdownParts>(() =>
        getCountdownParts(birthday)
    )

    useEffect(() => {
        // setInterval runs a function repeatedly on a timer
        // 1000ms = every 1 second
        const interval = setInterval(() => {
            setParts(getCountdownParts(birthday)) //each tick calls getCountdownParts(birthday) again, so the countdown stays live
        }, 1000)

        //cleanup function
        //when the component using this hook unmounts (disappears from screen)
        // react calls this to stop the interval - otherwise it keeps running forever
        // leaking memory in the background
        return () => clearInterval(interval)

    }, [birthday])

    return parts
}
