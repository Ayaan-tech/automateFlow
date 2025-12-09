import React from 'react'
import Register from '../_components/RegisterForm'
import { noAuth, requireAuth } from '@/lib/auth-utils'

const Registerpage = async() => {
    await noAuth()
  return <Register/>
}

export default Registerpage