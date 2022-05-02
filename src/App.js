import { firestore } from './utils/firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query, updateDoc} from "firebase/firestore"; 
import { useEffect, useState } from 'react'
import SignIn from './components/SignIn'
import Register from './components/Register';


function App() {
  const [note, setNote] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [notesFromDb, setNotesFromDb] = useState([])
  const [notesLoading , setNotesLoading] = useState(false)
  // const [activeComponent, setActiveComponent] = useState('home')

  
  const [user, setUser] = useState({
    email: '',
    uid: '',
    userName: '',

  })
  
  useEffect(() => {

    const collectionRef = collection(firestore,"to-do-list")
    const queryParams = where('uid', '==', user.uid)
    const notesQuery = query(collectionRef, queryParams)
    // onsnapshot is used so the data will update itself
    onSnapshot(notesQuery, (snapshot) =>{ 

      setNotesLoading(true);
      setNotesFromDb(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
      setNotesLoading(false)
    })
  });
  
  function handleUserRecieved(user){
    console.log(user)
    setUser({
      email: user.email,
      uid: user.uid,
      userName: user.displayName,
    })

  }

  function handleLogOut(){
    setUser({
      email: '',
      uid: '',
      userName: '',
    })
    alert('Your logged out')

  }
   
  function UpdateNote(event){
    setNote(event.target.value)
  }

  const onClickHandler = async () =>{
    setButtonLoading(true)
    const collectionRef = collection(firestore, "to-do-list");
    const payload = { note: note, uid:user.uid }
    await addDoc( collectionRef, payload );
    setNote('');
    setButtonLoading(false)
  }

  const handleDelete = async(id) => {
    const docRef = doc(firestore, "to-do-list",id);
    await deleteDoc(docRef)
  }

  const handleEdit = async(id) => {
    const note = prompt('Change Your Note Here!')
    const docRef = doc(firestore,"to-do-list",id)
    const payload = {
      note: note
    }
    console.log(note)
    updateDoc(docRef, payload)
    setNote('');
  }

  
  return (
    // placed these brackets here
    <> 
      <div className="flex flex-col items-center">
      <header>
        {user.uid &&
        <div>
          <input type="text" onChange={ UpdateNote }  value={ note } id="task_Input"  name='nameOfNote' placeholder="What's Next!"/>
          {buttonLoading ? <p>Loading....</p> : <button onClick={onClickHandler}  id="submit" name='addNoteButton'>Submit</button>}
        </div>
        }
        {/* condition ? run if true : run if false */}
      
        {!user.uid && 
          <div className='mt-10'>
            <SignIn handleUserRecieved={handleUserRecieved} />
            <Register handleUserRecieved={handleUserRecieved}/>

          </div>
          
        }
        
      </header>
      {user.uid &&
      <main>
          <h2>THINGS TO DO:</h2>
          <div className=''>

            { notesLoading ? <p>Loading....</p> : 
            
              <ul>
                {notesFromDb.map((note) => {
                  return(
                    <div className='m-1 p-4 bg-gradient-to-r from-gray-600 to-blue-800 rounded'>
                      <li key={note.id}>{ note.note }
                      <input type="text"  value={ note } id="task_Input"  name='nameOfNote' placeholder="What's Next!"/>

                        <div className='float-right '>
                        <button className='text-green-600   px-2 py-1 mr-2'  onClick={()=> (handleEdit(note.id))}>Edit</button>
                        <button className='text-red-600  ' onClick={()=> (handleDelete(note.id))}>Delete</button>
                        </div>
                      </li> 
                    </div>
                  )
                })}
              </ul>
            }    
          </div>
      </main>
      }
      {user.uid && 

      <button className='flex border-solid max-w-xs justify-center py-2 px-4 rounded' onClick={handleLogOut}>Log Out</button>
      }
    </div>

    </>
  );
}

export default App;
