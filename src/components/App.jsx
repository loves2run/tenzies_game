import { useState } from 'react'
import { nanoid } from 'nanoid'

import Die from './Die'

export default function App() {

    const [dice, setDice] = useState(generatAllNewDice())
    

    function generatAllNewDice() {
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

    /*
        -call setDice to trigger re-render of our state variable
        - map over the array of die objects
        - if die being iterated over containes a isHeld: false then generate a new value
    */

    function rollDice() {
        // setDice(generatAllNewDice())
        setDice(oldDice => oldDice.map(die =>
            die.isHeld !== true ?
                {...die, value: Math.ceil(Math.random() * 6)}:
                die
        ))
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die => 
            die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        ))
    }

    return(
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze 
            it at its current value between rolls.</p>

                <div className="diceContainer">
                    {diceElements}
                </div>

                <button id="rollButton" onClick={rollDice}>Roll</button>
        </main>
    )
}