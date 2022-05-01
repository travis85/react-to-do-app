
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
        <input type='text' placeholder='Email' value={ email } onChange={ updateEmail }></input>
        <input type='password' placeholder='Password' value={ password } onChange={ updatePassword }></input>
        <button onClick={()=> (handleSignIn())}>Sign In</button>

    </div>
  )
}
