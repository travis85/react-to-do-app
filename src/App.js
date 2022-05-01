import './App.css';
import { firestore } from './utils/firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc, setDoc, where, query} from "firebase/firestore"; 
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
    const payload = {note}
    setDoc(docRef, payload)
    setNote('');
  }

  
  return (
    // placed these brackets here
    <> 
        <div className="App">
      <header>
        {user.uid &&
        <div>
          <input type="text" onChange={ UpdateNote }  value={ note } id="task_Input"  name='nameOfNote' placeholder="What's Next!"/>
          {buttonLoading ? <p>Loading....</p> : <button onClick={onClickHandler}  id="submit" name='addNoteButton'>Submit</button>}
        </div>
        }
        {/* condition ? run if true : run if false */}
      
        {!user.uid && 
          <div>
            <SignIn handleUserRecieved={handleUserRecieved} />
            <Register handleUserRecieved={handleUserRecieved}/>

          </div>
          
        }
        
      </header>
      {user.uid &&
      <main>
          <h2>THINGS TO DO</h2>
          <div id="task">

            { notesLoading ? <p>Loading....</p> : 
              <ul>
                {notesFromDb.map((note) => {
                  return(
                    <li key={note.id}>{ note.note }
                     <button id="edit" onClick={()=> (handleEdit(note.id))}>Edit</button>
                     <button id='delete' onClick={()=> (handleDelete(note.id))}>Delete</button>
                    </li> 
                  )
                })}

              </ul>
            }    
          </div>
      </main>
      }
      {user.uid && 
      <button onClick={handleLogOut}>Log Out</button>
      }

    </div>

    </>
  );
}

export default App;
