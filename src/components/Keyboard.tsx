import EnterIcon from '../assets/enter_icon.svg'
import DeleteIcon from '../assets/delete_icon.svg'
import { useStore } from '../utils/store'
import { LetterState } from '../utils/word-utils'

export default function Keyboard({
  onClick: onClickProp,
}: {
  onClick: (letter: string) => void
}) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let letter = e.currentTarget.textContent

    if (e.currentTarget.firstElementChild?.nodeName === 'IMG') {
      letter = e.currentTarget.firstElementChild.getAttribute('alt')
    }
    onClickProp(letter!)
  }
  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyBoardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-1 space-x-1">
            {keyBoardRow.map((key, index) => {
              let styles = 'rounded-lg font-bold uppercase p-2 flex-1 h-12 '

              const letterState = keyStateStyles[keyboardLetterState[key]]

              if (letterState) {
                styles += ` ${letterState} `
              } else {
                styles += ' bg-zinc-500 '
              }

              return (
                <button key={index} className={styles} onClick={onClick}>
                  {key === 'Enter' ? (
                    <img
                      src={EnterIcon}
                      alt="Enter"
                      className="h-5 my-auto mx-auto"
                    ></img>
                  ) : key === 'Backspace' ? (
                    <img
                      src={DeleteIcon}
                      alt="Backspace"
                      className="h-5 my-auto mx-auto"
                    ></img>
                  ) : (
                    key
                  )}
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const keyboardKeys = [
  ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
  ['Enter', 'w', 'x', 'c', 'v', 'b', 'n', 'Backspace'],
]

const keyStateStyles = {
  [LetterState.Miss]: `bg-zinc-700 text-zinc-400`,
  [LetterState.Present]: `bg-yellow-500 `,
  [LetterState.Match]: `bg-green-500`,
}
