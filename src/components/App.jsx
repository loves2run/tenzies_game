import { useState } from 'react'

import Die from './Die'

export default function App() {

    const [diceArray, setDiceArray] = useState(generatAllNewDice())

    function generatAllNewDice() {
        return new Array(10).fill(0).map(() => Math.ceil(Math.random() *6))
    }

    const dice = diceArray.map(value => <Die value={value} />)
/*
* add new button per figma design
* add event listener to button to generate new array of numbers
* this should set diceArray state to the new array
*/


    return(
        <main>
            <section className="mainContent">
                <div className="diceContainer">
                    {dice}
                </div>
            </section>
        </main>
    )
}