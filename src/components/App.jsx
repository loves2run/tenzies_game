import { useState } from 'react'
import { nanoid } from 'nanoid'

import Die from './Die'

export default function App() {

    const [diceArray, setDiceArray] = useState(generatAllNewDice())

    function generatAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() *6),
            isHeld: false,
            id: nanoid()
        }))
    }

    const dice = diceArray.map(dieObj => <Die key={dieObj.id} value={dieObj.value} />)

    function rollDice() {
        setDiceArray(generatAllNewDice())
    }


    return(
        <main>
            <section className="mainContent">
                <div className="diceContainer">
                    {dice}
                </div>

                <button id="rollButton" onClick={rollDice}>Roll</button>

            </section>
        </main>
    )
}