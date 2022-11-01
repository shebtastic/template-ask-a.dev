const questions = [
  {
    id: '6f61a25d-6800-449a-8ecb-ae1c21432e5d',
    question: 'Is this the real life?\nIs this just fantasy?',
    submitter: 'Michael',
    submissionDate: '2022-11-01T00:17:53.983Z',
    answers: [
      {
        id: '0fb356d3-9612-4f6b-9588-899ab09d7d61',
        answer: 'Caught in a landside.\nNo escape from reality.',
        submitter: 'Michael',
        submissionDate: '2022-11-01T00:18:11.357Z',
      },
      {
        id: '8e043405-9b0a-463d-baac-0d81dc0d476f',
        answer: 'Open your eyes.\nLook up to the skies and see.',
        submitter: 'Michael',
        submissionDate: '2022-11-01T00:19:31.436Z',
      },
      {
        id: '47f3603f-7bac-460d-ad02-5fd4228c4055',
        answer:
          "I'm just a poor boy, I need no sympathy.\nBecause I'm easy come, easy go.\nLittle high, little low.\nAny way the wind blows doesn't really matter to me (to me).",
        submitter: 'Michael',
        submissionDate: '2022-11-01T00:19:51.643Z',
      },
    ],
    closed: true,
  },
  {
    id: '48be3bea-06aa-4477-92e0-776ab107c1fa',
    question:
      'What would happen if you tried to hit a baseball pitched at 90% the speed of light?',
    submitter: 'Michael',
    submissionDate: '2022-11-01T00:20:12.381Z',
    answers: [],
    closed: false,
  },
  {
    id: '12e23d74-40f0-4cad-98e7-59f3630770bd',
    question:
      'If I could fall into the sky, do you think time would pass me by?',
    submitter: 'Michael',
    submissionDate: '2022-11-01T00:20:47.295Z',
    answers: [
      {
        id: '9adaf826-d007-41ef-a398-395e86cf477f',
        answer: "'Cause you know I'd walk a thousand miles.",
        submitter: 'Michael',
        submissionDate: '2022-11-01T00:21:08.522Z',
      },
    ],
    closed: false,
  },
]

function getQuestions() {
  return questions
}

function getQuestionById(id) {
  return questions.find((question) => question.id === id)
}

const hostname = 'https://www.ask-a.dev'

function fetcher(url) {
  if (!url) return

  return fetch(hostname + url).then((res) => res.json())
}

async function sendQuestion(question, submitter = 'Anonymous') {
  return fetch(`${hostname}/api/questions`, {
    method: 'POST',
    body: JSON.stringify({ question, submitter }),
  }).then((res) => res.json())
}

async function sendAnswer(questionId, answer, submitter = 'Anonymous') {
  return fetch(`${hostname}/api/questions/${questionId}/answers`, {
    method: 'POST',
    body: JSON.stringify({ answer, submitter }),
  }).then((res) => res.json())
}

async function closeQuestion(questionId) {
  return fetch(`${hostname}/api/questions/${questionId}/close`, {
    method: 'POST',
  }).then((res) => res.json())
}

function fakeFetcher(url) {
  if (!url) return

  switch (true) {
    case '/api/questions' === url:
      return getQuestions()
    case url?.startsWith('/api/questions/'):
      return getQuestionById(url.split('/').at(-1))
    default:
      throw new Error('unmapped request')
  }
}

export default questions
export {
  hostname,
  fetcher,
  fakeFetcher,
  sendQuestion,
  sendAnswer,
  closeQuestion,
}
