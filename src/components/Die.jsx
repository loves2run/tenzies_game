export default function Die(props) {

    return(
            <button>{props.value}</button>
    )
}

//onClick={handleClick}

//need count function that allows a value of 1-6
//value should randomly change value onClick
//die component should be styled with css grid rendering 10 
//         instances of the die
//each die should have individual state b/c clicking one button shouldnt 
//         update state on remaining dice