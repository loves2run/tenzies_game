import { useState } from 'react'
import {useRef, useEffect} from 'react'
import { nanoid } from 'nanoid'
import Die from './Die'
import ConfettiComp from './Confetti'
import GameTimer from './GameTimer'


export default function App() {

    // const [timerReset, setTimerReset] = useState(false)    
    const [dice, setDice] = useState(generateAllNewDice())
    const [anyDiceHeld, setAnyDiceHeld] = useState(false)
    const [timerReset, setTimerReset] = useState(1)
    const newGameFocus = useRef(null)

    const gameWon = dice.every(die => die.isHeld === true) &&
    dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if(gameWon && newGameFocus.current !== null) {
            newGameFocus.current.focus({ focusVisible: true })
        }
    }, [gameWon])
   

    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() *6),
            isHeld: false,
            id: nanoid()
        }))
    }

    const diceElements = dice.map(dieObj => (
        <Die 
            id={dieObj.id}
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
            handleClick={hold}
           />)
    )

    function resetGame() {
        setDice(generateAllNewDice)
        setTimerReset(oldCount => oldCount + 1)
        setAnyDiceHeld(false)
    }

    function rollDice() {
        setDice(oldDice => oldDice.map(die =>
            die.isHeld !== true ?
                {...die, value: Math.ceil(Math.random() * 6)}:
                die
        ))
    }

    function hold(id) {
        setDice(oldDice => {
            const newDice = oldDice.map(die =>
                die.id === id ?
                    {...die, isHeld: !die.isHeld} :
                    die
            )

            const isAnyHeld = newDice.some(die => die.isHeld)
            setAnyDiceHeld(isAnyHeld)

            return newDice
        })
    }

    return(
        <main>
            {gameWon && <ConfettiComp />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze 
            it at its current value between rolls.</p>

            <GameTimer 
                gameWon={gameWon} 
                diceHeld={anyDiceHeld} 
                timerReset={timerReset} 
            />

                <div className="diceContainer">
                    {diceElements}
                </div>

                <button id="rollButton" onClick={gameWon ? resetGame : rollDice} ref={newGameFocus}>
                    {gameWon ? 'New Game' : 'Roll'}
                </button>
        </main>
    )
}