import { currentUser } from '@clerk/nextjs'
import React from 'react'

export default async function HomeTitle() {
  const user = await currentUser()
  return (
    <h2 className="text-4xl font-semibold ">¡Hola, {user?.firstName}!</h2>
  )
}
