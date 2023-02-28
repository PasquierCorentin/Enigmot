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
        <CharacterBox
          key={index}
          delayIndex={index}
          value={char}
          state={result[index]}
        />
      ))}
    </div>
  )
}

interface CharacterBoxProps {
  value: string
  state?: LetterState
  delayIndex: number
}

function CharacterBox({ delayIndex, value, state }: CharacterBoxProps) {
  const statesStyles =
    state == null ? 'border-zinc-500' : characterStatesStyles[state]

  const delayStyles =
    state == null
      ? ''
      : delayIndex == null
      ? ''
      : characterDelayStyles[delayIndex]

  return (
    <span
      className={`inline-block border-2 rounded-lg p-4 
      before:inline-block before:content-['_']
      uppercase font-bold text-2xl text-center ${statesStyles} ${delayStyles}`}
    >
      {value}
    </span>
  )
}

const characterDelayStyles: any = {
  [0]: `animation-delay-0 delay-0`,
  [1]: `animation-delay-1 delay-1`,
  [2]: `animation-delay-2 delay-2`,
  [3]: `animation-delay-3 delay-3`,
  [4]: `animation-delay-4 delay-4`,
}

const characterStatesStyles = {
  [LetterState.Miss]: `bg-zinc-600 border-zinc-600 animate-flip `,
  [LetterState.Present]: `bg-yellow-500 border-yellow-500 animate-flip `,
  [LetterState.Match]: `bg-green-500 border-green-500 animate-flip`,
}
