
import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


export default function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(){
      const res = await signInWithEmailAndPassword(auth,email,password)
      props.handleUserRecieved(res.user)
    }
    function updateEmail(event){
        setEmail(event.target.value)
    }
    function updatePassword(event){
        setPassword(event.target.value)
    }

  return (
    <div>
        <input className='bg-gray-400 border-white border-solid px-4 py-2 placeholder-white' type='text' placeholder='Email' value={ email } onChange={ updateEmail }></input>
        <input className='bg-gray-400 border-white border-solid px-4 py-2 m-4 placeholder-white' type='password' placeholder='Password' value={ password } onChange={ updatePassword }></input>
        <button className='text-white hover:text-slate-400' onClick={()=> (handleSignIn())}>Sign In</button>

    </div>
  )
}
