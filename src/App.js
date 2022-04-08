

//     npm install firebase - Firebase Install Command


import './App.css';
import { initializeApp } from "firebase/app";       // To Initialize Firebase

import { getAuth, signInWithPopup, signOut } from "firebase/auth";   // To use Auth Import "getAuth", 
                                                                    // To use sign In With Popup Import " signInWithPopup"
                                                                    // To use sign out Import " signout"
import { GoogleAuthProvider } from "firebase/auth";                 // To use Google Authentication import "GoogleAuthProvider" 

import { useState } from 'react';

//     Firtst, Initialize Firebase App with specific Firebase configuration object

const firebaseConfig = {

  apiKey: "AIzaSyBjkd2EuI8VjSMS6lJnyPXOUQAqQl7S4Mc",
  
  authDomain: "fir-auth-practice-973ee.firebaseapp.com",

  projectId: "fir-auth-practice-973ee",

  storageBucket: "fir-auth-practice-973ee.appspot.com",

  messagingSenderId: "361583391731",

  appId: "1:361583391731:web:57a74347a86129feb1d886"

}

// Initializing Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function App() {
  // As the state of user can be changed by signing in, use "useState()" method to handle the state Change.
  const [user,setuser]  = useState({
    isSignedIn : false,
    name : '',
    email: '',
    photo:'',
  });

  // To use Google Authentication declare a Variable named provider with the vlaue of "GoogleAuthProvider()" method
  const provider = new GoogleAuthProvider();

  // To handle Sign In Button Click
  const handleSignIn = ()=>{
    signInWithPopup(auth, provider)           // Google ASign In Popup
  .then((result) => {
    console.log(result);

    const {displayName, email, photoURL} = result.user;         // Destructuring properties

    const signedInUser = {          // Assigning grabed values to the properties
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL,
    }
    setuser(signedInUser);        // Setting "signedInUser" as user
  });
  };

    // To Handle Sign Out Button Click
  const handleSignOut = ()=>{
    const auth = getAuth();
    signOut(auth)   // Signin Out
    .then(() => {
      const signedOutUser = {       // Reseting user property value
        isSignedIn : false,
        name: '',
        email: "",
        photo: '',
      }
      setuser(signedOutUser);   // Reseting user with "signedOutUser"
    })
    .catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <div className='App'>
      
      {/* Dispalying Sing In or Sign Out Button according to the user sign in status */}
      { user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button> }

      {/* Displaying Sign In or Sign Out statues through comment */}
      {user.isSignedIn ? <h1>Congratulation</h1> : <h1>Please Log In.</h1>}

      {/* Displaying Signed In User's information */}
      {
        user.isSignedIn && <div>
          Welcome <h2>{user.name}</h2>
          <h3>Email Address : {user.email}</h3>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
