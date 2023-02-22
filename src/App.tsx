import React, { useEffect, useRef, useState } from 'react'
import { GUESS_LENGTH, useStore } from './utils/store'
import { isValidWord, LETTER_LENGTH } from './utils/word-utils'
import WordRow from './components/WordRow'
import Keyboard from './components/Keyboard'

function App() {
  const state = useStore()
  const [guess, setGuess, addGuessLetter] = useGuess()
  const [showInvalidGuess, setInvalidGuess] = useState(false)
  const addGuess = useStore((s) => s.addGuess)
  const previousGuess = usePrevious(guess)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500)
    }
    return () => clearTimeout(id)
  }, [showInvalidGuess])

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess)
        setInvalidGuess(false)
      } else {
        setInvalidGuess(true)
        setGuess(previousGuess)
      }
    }
  }, [guess])

  const isGameOver = state.gameState !== 'playing'

  let rows = [...state.rows]

  let currentRow = 0

  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''))

  return (
    <div className="">
      <div className="mx-auto w-96">
        <header className="border-b border-zinc-500 pb-2 mt-4">
          <h1 className="text-4xl text-center my-2" data-testid="appTitle">
            ÉnigMot
          </h1>
        </header>

        <main className="grid grid-rows-6 gap-4 my-6">
          {rows.map(({ guess, result }, index) => (
            <WordRow
              key={index}
              letters={guess}
              result={result}
              className={
                showInvalidGuess && currentRow === index ? 'animate-shake' : ''
              }
            />
          ))}
        </main>

        <Keyboard
          onClick={(letter) => {
            addGuessLetter(letter)
          }}
        />

        {isGameOver && (
          <div
            role="modal"
            className="absolute left-0 right-0 top-0 w-full h-full backdrop-blur-sm bg-black/30"
          >
            <div className="filter-none bg-zinc-600 w-1/3 p-6 mx-auto mt-20 rounded-lg text-center">
              <p data-testid="endGameModal" className="font-thin text-sm">
                Partie Terminée
              </p>

              <p className="my-4 uppercase text-xl">
                {state.gameState === 'won' ? 'Victoire !' : 'Défaite...'}
              </p>

              <p className="text-md">
                La réponse était :{' '}
                <span className="uppercase font-bold text-xl">
                  {state.answer}
                </span>
              </p>

              {/* <WordRow
                letters={state.answer}
                className="items-center justify-items-center"
              /> */}

              <button
                data-testid="newGameButton"
                className="block bg-green-500 rounded-full py-2 px-4 mx-auto mt-8"
                onClick={() => {
                  state.newGame()
                  setGuess('')
                }}
              >
                Nouvelle Partie
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState('')

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess = letter.length === 1 ? curGuess + letter : curGuess

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1)
        case 'Enter':
          if (newGuess.length === LETTER_LENGTH) {
            return ''
          }
      }

      if (curGuess.length === LETTER_LENGTH) {
        return curGuess
      }

      return newGuess
    })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key
    addGuessLetter(letter)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return [guess, setGuess, addGuessLetter]
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
