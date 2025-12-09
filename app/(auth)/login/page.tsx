import React from 'react'
import Login  from '../_components/LoginForm'
import { noAuth } from '@/lib/auth-utils'
import Link from 'next/link';
import Image from 'next/image';
const Logingpage = async() => {
    await noAuth();
  return <Login/>
}

export default Logingpage