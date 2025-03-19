
export default function Die(props) {
    
    const styles = {
        backgroundColor: props.isHeld ? '#59e391' : 'white'
    }
    

    return(
            <button 
                style={styles}
                onClick={() => props.handleClick(props.id)}
                aria-pressed={props.isHeld}
                aria-label={`Die with value ${props.value}, 
                     ${props.isHeld ? "held" : "not held"}`}
            >{props.value}</button>
    )
}
