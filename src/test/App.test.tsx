import { describe, expect, it } from 'vitest'
import App from '../App'
import { useStore } from '../utils/store'
import { render, screen, userEvent } from './test-utils'

describe('App global tests', () => {
  it('the title is visible', () => {
    render(<App />)
    expect(screen.queryByTestId('appTitle')).toBeInTheDocument()
  })

  it('shows empty state', () => {
    useStore.getState().newGame([])
    render(<App />)

    expect(screen.queryByTestId('endGameModal')).toBeNull()
    expect(document.querySelectorAll('main div')).toHaveLength(6)
    expect(document.querySelector('main')?.textContent).toEqual('')
  })

  it('shows 1 row of guesses', () => {
    useStore.getState().newGame(['salut'])
    render(<App />)

    expect(document.querySelector('main')?.textContent).toEqual('salut')
  })

  it('shows lost game over state', () => {
    useStore.getState().newGame(Array(6).fill('salut'))
    render(<App />)

    expect(screen.queryByTestId('endGameModal')).toBeInTheDocument()
  })

  it('shows won game over state', () => {
    useStore.getState().newGame(Array(2).fill('salut'))
    const answer = useStore.getState().answer
    useStore.getState().addGuess(answer)
    render(<App />)

    expect(screen.queryByTestId('endGameModal')).toBeInTheDocument()
  })

  it('can start a new game', async () => {
    useStore.getState().newGame(Array(6).fill('salut'))
    const user = userEvent.setup()
    render(<App />)

    expect(screen.queryByTestId('endGameModal')).toBeInTheDocument()
    await user.click(screen.getByTestId('newGameButton'))
    expect(document.querySelector('main')?.textContent).toEqual('')
  })
})
