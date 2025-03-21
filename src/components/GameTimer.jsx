import { useState, useRef, useEffect } from 'react'

export default function GameTimer(props) {

    console.log("GameWon:", props.gameWon)

    const[timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    let timeInterval = useRef(null)

    const handleStart = () => {
        if (isRunning) return  //guard clause to check if isRunning is true, if it is the function just stops running
        setIsRunning(true)
        timeInterval.current = setInterval(() => {   //setInterval is a built-in JS function
            setTimer((prev) => prev + 1)
        }, 10)
    }

    const handlePause = () => {
        if(!isRunning) return
        setIsRunning(false)
        clearInterval(timeInterval.current)   //clearInterval is the counterpart to setInterval
    }

    const handleStop = () => {
        if(isRunning && timer === 0) //guard clause
        setIsRunning(false)
        clearInterval(timeInterval.current)
        setTimer(0)
    }

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60000)
            .toString()
            .padStart(2, "0")
        const seconds = Math.floor(timer / 1000) % 60
            .toString()
            .padStart(2, "0")
        const milliSeconds = (timer % 1000) 
            .toString()
            .padStart(3, "0")
        
        return { minutes, seconds, milliSeconds}
    }

    useEffect(() => {
        if(props.gameWon === true ) {
            handlePause()
            setTimer(0)
        }
    }, [props.gameWon])

    const { minutes, seconds, milliSeconds } = formatTime(timer) //using destructuring assignment to extract the 
                                                                 //3 time components returned in formatTime fx
                                                                 //these variables can now be used in my component
                                                                 //outside the function

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
                    <h1>{milliSeconds}</h1>
                </div>
            </div>
            <div className="buttonContainer">
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleStop}>Reset</button>
            </div>
        </div>
        
    )
}