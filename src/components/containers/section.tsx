import React, { ReactNode } from 'react'

export default function Section({children, id}:{children?: ReactNode, id?:string}) {
  return (
    <section id={id} className='flex flex-col gap-sm sm:gap-md'>{children}</section>
  )
}
