import styles from './Keyboard.module.css'

type keyboardProps = {
    disabled:boolean
    activeLetters:string[]
    inactiveLetters:string[]
    addGuessedLetter:(letter:string)=> void
}

function Keyboard({ disabled = false, activeLetters,inactiveLetters,addGuessedLetter }: keyboardProps) {
    const KEYS = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ]

    return (
        <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(50px, 1fr)) ',
            gap:'1rem',
            width:'100%'
        }}>
        {KEYS.map((key) => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return (
            <button 
            onClick={() => addGuessedLetter(key)}
            className={`${styles.btn} ${isActive ? styles.active : ''}
            ${isInactive ? styles.inactive : ' '} `}
            disabled={isActive || isInactive || disabled}
            key={key}
            >
                {key}
            </button>
        )
        })}
        </div>
    )
}

export default Keyboard