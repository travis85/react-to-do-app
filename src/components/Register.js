import React, {useState} from 'react'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default  function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showRegister, setShowRegister] = useState(false)

    function handleShow(){
        setShowRegister(true)
    }
    async function handleRegister(){
        setShowRegister(false)
        alert('Your Registered, You can now sign in!')
        const res = await createUserWithEmailAndPassword(auth,email,password) 
        setEmail('')
        setPassword('')
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
        { showRegister &&
            <div>
                <input className='bg-gray-400 border-white border-solid px-4 py-2 rounded placeholder-white ' type=' text' placeholder='Register Email' value={ email } onChange={ updateEmail }></input>
                <input className='bg-gray-400 border-white border-solid px-4 py-2 m-4 placeholder-white rounded' type='password' placeholder='Register Password' value={ password } onChange={ updatePassword }></input>
                <button className='text-white hover:text-slate-400' onClick={()=> (handleRegister())}>Register</button>
            </div>
        }
        { !showRegister &&
        <button className='text-white hover:text-slate-400 mt-10' onClick={()=> (handleShow())}>Register?</button>
        }
    </div>
  )
}


// try {
//     await someFunction()
//   } catch(err) {
//     console.log(err)
//   }