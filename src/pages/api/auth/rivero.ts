import type { NextApiHandler } from 'next'

interface User {
  name: string
  // image: string
  email: string
}

const credentialsAuth: NextApiHandler = (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).end()
    return
  }

  if (request.body.password === 'loremipsum') {
    const platziUser: User = {
      name: 'Student',
      email: 'student@platzi.com',
      // image: '',
    }
    return response.status(200).json(platziUser)
  }

  response.status(401).end()
}

export default credentialsAuth
