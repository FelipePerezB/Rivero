import React, { ReactNode } from 'react'

export default function SmallTitle({children}:{children: ReactNode}) {
  return (
    <h3 className='text-xl font-medium'>{children}</h3>
  )
}
