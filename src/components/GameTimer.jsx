import { useEffect, useState } from 'react'

export default function GameTimer({gameWon, diceHeld, timerReset}){

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
        if (diceHeld && !isRunning) {
            handleStart()
        }
    }, [diceHeld])

    useEffect(() => {
        if(gameWon) {
            handlePause()
        }
    }, [gameWon])

    useEffect(() => {
        if(timerReset > 1) {
            handleReset()
        }
    }, [timerReset])

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
        const milliseconds = Math.floor(clock / 10) % 100
            .toString()
            .padStart(2, "0")
        

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
    </div>
    )
}