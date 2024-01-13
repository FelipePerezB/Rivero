/* eslint-disable @next/next/no-img-element */
import { currentUser } from '@clerk/nextjs'
import Card from '@components/cards/Card'
import { Role } from '@prisma/client'
import React from 'react'

export default async function UserCard() {
  const user = await currentUser()
  const firstName = user?.firstName
  const lastName = user?.lastName ?? ""
  const role = (user?.publicMetadata?.role ?? Role.STUDENT) as Role
  const image = user?.imageUrl
  return (
    <Card href='profile' interactive className='flex gap-2.5 items-center justify-center sm:w-max w-full h-full'>
      <img alt='Profile'src={image} className='w-8 h-8 rounded-full'/>
      <div className='flex flex-col'>
        <div className='flex gap-1 text-md font-medium sm:text-lg'>
          <span>{firstName}</span>
          <span className='hidden sm:block'>{lastName}</span>
        </div>
        <span className='text-xs font-extralight'>{role}</span>
      </div>
    </Card>
  )
}
