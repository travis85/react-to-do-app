import React, {useState} from 'react'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default  function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleRegister(){
        const res = await createUserWithEmailAndPassword(auth,email,password) 
        console.log(res)
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
        {/* <input type='text' placeholder='userName' value={ userName } onChange={ updateUserName }></input> */}

        <button onClick={()=> (handleRegister())}>Register</button>
    </div>
  )
}


// try {
//     await someFunction()
//   } catch(err) {
//     console.log(err)
//   }