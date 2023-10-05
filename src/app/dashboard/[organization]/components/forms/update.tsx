import Button from '@components/Button'
import React from 'react'
import StandardInput from 'src/app/components/inputs/standard'

export default function UpdateForm() {
  return (
    <form className='flex flex-col gap-4'>
      <StandardInput label='Nuevo nombre'/>
      <Button>Guardar</Button>
    </form>
  )
}
