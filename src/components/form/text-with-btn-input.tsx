import React from 'react'
import TextInput from './text-input'
import Button from '@components/common/buttons/button/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function TextWithInputBtn() {
  return (
    <label className='relative flex items-center max-w-xs'>
      <TextInput name='"' type='text' className='pr-24'/>
      <Button className='absolute right-2'>Enviar <FontAwesomeIcon icon={faPaperPlane} className='h-2.5 w-2.5'/></Button>
    </label>
  )
}
