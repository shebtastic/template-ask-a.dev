import { useState } from 'react'

function AddQuestionOrAnswer({ onAdd, buttonText = 'Send.' }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [questionInput, setQuestionInput] = useState('')

  return (
    <div>
      {isAddOpen ? (
        <>
          <button
            aria-label="close submission form"
            onClick={() => setIsAddOpen(false)}
          >
            x
          </button>
          <form
            onSubmit={(event) => {
              event.preventDefault()

              onAdd(questionInput)

              setQuestionInput('')
              setIsAddOpen(false)
            }}
          >
            <label htmlFor="post">Write your post here:</label>
            <textarea
              id="post"
              value={questionInput}
              onChange={(event) => setQuestionInput(event.target.value)}
            />
            <button type="submit">{buttonText}</button>
          </form>
        </>
      ) : (
        <button
          aria-label="expand submission form"
          onClick={() => setIsAddOpen(true)}
        >
          +
        </button>
      )}
    </div>
  )
}

export default AddQuestionOrAnswer
