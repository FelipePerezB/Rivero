import Button from '@components/Button'
import axios from 'axios'
import React from 'react'
import { api } from 'src/getDoc/utils/api'
import Layout from 'src/layout/Layout'

export default function dashboard() {
  const sendInvitation = async () =>{
    const {data} = await axios.post('/api/sendInvitation')
    console.log(data)
  }
  return (
    <Layout>
      <Button onClick={sendInvitation}>Enviar invitación</Button>
    </Layout>
  )
}
