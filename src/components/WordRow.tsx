import { LetterState, LETTER_LENGTH } from '../utils/word-utils'

interface WordRowProps {
  letters: string
  result?: LetterState[]
  className?: string
}

export default function WordRow({
  letters: lettersProp = '',
  result = [],
  className = '',
}: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length

  const letters = lettersProp.split('').concat(Array(lettersRemaining).fill(''))

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  )
}

interface CharacterBoxProps {
  value: string
  state?: LetterState
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const statesStyles =
    state == null ? 'border-zinc-500' : characterStatesStyles[state]

  return (
    <span
      className={`inline-block border-2 rounded-lg p-4 
      before:inline-block before:content-['_']
      uppercase font-bold text-2xl text-center  ${statesStyles}`}
    >
      {value}
    </span>
  )
}

const characterStatesStyles = {
  [LetterState.Miss]: `bg-zinc-600 border-zinc-600 animate-flip `,
  [LetterState.Present]: `bg-yellow-500 border-yellow-500 animate-flip `,
  [LetterState.Match]: `bg-green-500 border-green-500 animate-flip`,
}
