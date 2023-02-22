import { describe, expect, it } from 'vitest'
import {
  computeGuess,
  getRandomWord,
  isValidWord,
  LetterState,
} from '../utils/word-utils'
import { render, screen } from './test-utils'

describe('getRandomWord', () => {
  it('random word', () => {
    expect(getRandomWord()).toBeTruthy()
    expect(getRandomWord().length).toEqual(5)
  })
})

describe('computeGuess', () => {
  it('works with match and present', () => {
    expect(computeGuess('poule', 'plate')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Match,
    ])
  })

  it('works with all matches', () => {
    expect(computeGuess('poule', 'poule')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ])
  })

  it('works with all misses', () => {
    expect(computeGuess('poule', 'aaaaa')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ])
  })

  it('only 1 match when the letter is present 2 times', () => {
    expect(computeGuess('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ])
  })

  it('2x a letter in guess which is only once in the answer', () => {
    expect(computeGuess('allol', 'smelt')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ])
  })
})

describe('isValidWord', () => {
  it('works with valid word', () => {
    expect(isValidWord('monde')).toBe(true)
  })

  it('works with invalid word', () => {
    expect(isValidWord('sdfht')).toBe(false)
  })
})
