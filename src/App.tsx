import { useCallback, useEffect, useState } from 'react'
import Keyboard from './Keyboard';
import HangmanWord from './HangmanWord';
import HangmanDrowing from './HangmanDrowing';
import words from './wordList.json'
import startFireworksWithAudio from  './Fireworks'
import './Style.css';

function App() {
  const [hint, setHint] = useState('');
  function  getWord () {
    const wordOBJ = words[Math.floor(Math.random() * words.length)]
    setHint(wordOBJ.hint);
    return wordOBJ.word
  }
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters  =  guessedLetters.filter((letter) => { return !wordToGuess.toLowerCase().includes(letter)} )
  const isLoser = incorrectLetters.length >= wordToGuess.length
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter.toLowerCase()))
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter.toLowerCase()) || isWinner || isLoser)  return
    setGuessedLetters(currentLetters => [...currentLetters, letter])  
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    if (!isWinner || !isLoser) {
      const handler = (e:KeyboardEvent) => {
        const key = e.key
        if (!key.match(/^[a-z]$/)) return
          e.preventDefault()
          addGuessedLetter(key)
      }
      document.addEventListener('keypress', handler)
      return ()=>{
        document.removeEventListener('keypress', handler)
      }
    }
  }, [isWinner, isLoser])

  useEffect(() => {
    if (!isWinner || !isLoser) {
    const handler = (e:KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener('keypress', handler)
    return ()=>{
      document.removeEventListener('keypress', handler)
    }
  }
  }, [isWinner, isLoser])
  
  // firework code start here
  function shakeElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.style.animation = '';
    setInterval(() => {
      element.style.animation = 'shake 0.5s'; 
      element.addEventListener('animationend', () => {
        element.style.animation = '';
      });
    }, 500); 
  }
  useEffect(() => {
    if (isWinner) { startFireworksWithAudio(); }
    if (isLoser) { shakeElement('hangman-container'); }
  }, [isWinner, isLoser])

  return (
    <div
    style={{
      width: '100%',
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      margin: '0 auto',
      padding: '0rem 1rem 1rem 1rem ',
      boxSizing: 'border-box',
      alignItems: 'center',
      fontFamily:'monospace'
    }}
  >
      <div className='appTitle'> HangMan - A word guessing Game </div>
      <div className='gameStatus'>
        {isWinner && 'Winner! - Refresh to try again'}
        {isLoser && 'Nice Try - Refresh to try again'}
      </div>
      <div style={{ fontSize:'2vw' }}>Hint:- {hint}</div>
      <HangmanDrowing numberofGuesses={incorrectLetters.length  }/>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <Keyboard
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => 
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
    </div>
  )
}

export default App
