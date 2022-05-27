
import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


export default function SignIn(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  
  function clearError() {
    setTimeout(() => {
      setErrorMessage('')
    },3000)
  }

  
  async function handleSignIn() {
    //loading true

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      props.handleUserRecieved(res.user) 
    } catch (error) {
      setErrorMessage('Sign In Error')
      clearError()
    }
    
  }

  function updateEmail(event){
      setEmail(event.target.value)
  }
  function updatePassword(event){
      setPassword(event.target.value)
  }

  return (
    <div className='grid grid-cols-1 place-items-center '>
        <input className='bg-gray-400 border-white border-solid px-4 py-2 placeholder-white mb-2' type='text' placeholder='Email' value={ email } onChange={ updateEmail }></input>
        <input className='bg-gray-400 border-white border-solid px-4 py-2  placeholder-white' type='password' placeholder='Password' value={ password } onChange={ updatePassword }></input>
      <button className='text-white hover:text-slate-400' onClick={() => (handleSignIn())}>Sign In</button>
      <p className='text-red-500'>{ errorMessage }</p>

    </div>
  )
}
