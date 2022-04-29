import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPbA5Ds7kTQefVRoJXLSqoPnmFDzo60DE",
  authDomain: "to-do-list-e1f8f.firebaseapp.com",
  databaseURL: "https://to-do-list-e1f8f-default-rtdb.firebaseio.com",
  projectId: "to-do-list-e1f8f",
  storageBucket: "to-do-list-e1f8f.appspot.com",
  messagingSenderId: "749634653409",
  appId: "1:749634653409:web:deca8d68451037887e7ba0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app);
