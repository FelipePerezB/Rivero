import React, { ReactNode } from 'react'

export default function Section({children}:{children: ReactNode}) {
  return (
    <section className='flex flex-col gap-sm sm:gap-md'>{children}</section>
  )
}
