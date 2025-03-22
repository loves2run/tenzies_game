import { useEffect, useState } from 'react'

export default function GameTimer({gameWon, shouldStartTimer}){
    /* 
    WHAT SHOULD TIMER DO?
        - start a timer when the user first clicks die to hold it
        - stop timer when gameWon becomes true
        - reset timer when new game button is clicked

    PSEUDO CODE TO BUILD IT
        - identify accurate method for tracking time --> Date.now()
        - identify state variables needed
            -tracking if timer is running or not
            -tracking total time since timer started
            -storing timestamp of last updated time (for timing accuracy)
        -create timer mechanism
        -calculate elapsed time
        -add user controls if I want the user to be able to pause or reset time during game
        -render Timer app in App.jsx
        -styling for Timer

    */

    const [isRunning, setIsRunning] = useState(false)
    const [clock, setClock] = useState(0)
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now())

    useEffect(() => {
        const timer = () => {
            const now = Date.now()
            setClock(prevClock => prevClock + (now - lastUpdateTime))
            setLastUpdateTime(now)
        }

        let intervalId
        if (isRunning) {
            intervalId = setInterval(timer, 100)
        }

        return () => clearInterval(intervalId)

    }, [gameWon, isRunning, lastUpdateTime])

    useEffect(() => {
        if (shouldStartTimer && !isRunning) {
            handleStart()
        }
    }, [shouldStartTimer])

    const handleStart = () => {
        if (isRunning) return
        setIsRunning(true)
        setLastUpdateTime(Date.now())

    }

    const handlePause = () => {
        if (!isRunning) return
        setIsRunning(false)
    }

    const handleReset = () => {
        setIsRunning(false)
        setClock(0)
        setLastUpdateTime(Date.now())
    }

    const formatTime = (clock) => {
        const minutes = Math.floor(clock / 60000)
            .toString()
            .padStart(2, "0")
        const seconds = Math.floor(clock / 1000) % 60
            .toString()
            .padStart(2, "0")
        const milliseconds = Math.floor(clock)
            .toString()
            .slice(-2)

        return {minutes, seconds, milliseconds}
    }

    const { minutes, seconds, milliseconds } = formatTime(clock)

    return (
        <div className="timerApp">
        <div className="timerContainer">
            <div className="timerBox">
                <h1>{minutes}</h1>
            </div>
            <span className="colon">:</span>
            <div className="timerBox">
                <h1>{seconds}</h1>
            </div>
            <span className="colon">:</span>
            <div className="timerBox">
                <h1>{milliseconds}</h1>
            </div>
        </div>
        <div className="buttonContainer">
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
    )
}