import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import AddQuestionOrAnswer from './AddQuestionOrAnswer'

describe('AddQuestionOrAnswer', () => {
  it.todo('closes on "x" button click')
  it.todo('has configurable buttonText')

  it('should render closed by default', () => {
    //given
    render(<AddQuestionOrAnswer />)

    //when
    const sendButton = screen.queryByText(/send/i)

    //then
    expect(sendButton).not.toBeInTheDocument()
  })

  it('expands on "+" button click', async () => {
    //given
    render(<AddQuestionOrAnswer />)

    //when
    const expandButton = screen.getByText('+')
    await userEvent.click(expandButton)

    const textArea = screen.getByLabelText(/write your post here/i)
    const sendButton = screen.getByText(/send/i)

    const expandButtonAnywhere = screen.queryByText('+')
    const closeButtonAnywhere = screen.queryByText('x')

    //then
    expect(expandButtonAnywhere).toBeNull()
    expect(closeButtonAnywhere).toBeInTheDocument()
    expect(textArea).toBeVisible()
    expect(sendButton).toBeVisible()
  })

  it('triggers onAdd function', async () => {
    //given
    const fn = jest.fn()
    const question = 'this is a question?'

    render(<AddQuestionOrAnswer onAdd={fn} />)

    //when
    const expandButton = screen.getByText('+')
    await userEvent.click(expandButton)

    const textArea = screen.getByLabelText(/write your post here/i)
    await userEvent.type(textArea, question)

    const sendButton = screen.getByText(/send/i)
    await userEvent.click(sendButton)

    const newExpandButton = screen.getByText('+')

    //then
    expect(newExpandButton).toBeVisible()
    expect(sendButton).not.toBeInTheDocument()
    expect(textArea).not.toBeInTheDocument()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(question)
  })
})
