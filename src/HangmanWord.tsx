type HangmanWordProps = {
  guessedLetters:string[]
  wordToGuess:string
  reveal:boolean
}

function HangmanWord({ reveal=false, guessedLetters, wordToGuess }: HangmanWordProps ) {
  return (
    <div style={{
      display:'flex', 
      flexWrap:'wrap',
      gap:'.25em',
      fontSize:'6rem',
      fontWeight:'bold',
      textTransform:'uppercase',
      fontFamily:'monospace'
      }}
      >
        {wordToGuess.split('').map((letter, index) => (
          <span style={{borderBottom:'.1rem solid black'}} key={index}>
              <span style={{
                visibility: (guessedLetters.includes(letter.toLowerCase()) || reveal) ? 'visible' : 'hidden',
                color:((!(guessedLetters.includes(letter.toLowerCase()))) && reveal)  ? 'red' : 'black'
              }}>{letter}</span>
          </span>
        ))}
      </div>
  )
}

export default HangmanWord