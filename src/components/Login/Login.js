import React, { useState, useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFrameWork, handleGoogleSignIn, handleSignOut, handleSignInFacebook, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './LoginManager';



function Login() {
  const [newUser,setNewUser] = useState();
  const[user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    phone: '',
    
   
  })
  initializeLoginFrameWork();
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  
  const facebookSignIn = () => {
    handleSignInFacebook()
    .then(res => {
      handleResponse(res, true);
    })
  }


  const signOut = () => {
   handleSignOut()
   .then(res => {
    handleResponse(res, false);
   })
  }

 

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    // console.log(e.target.name,e.target.value);
  
  if( e.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  }

    if( e.target.name === 'password'){
      isFieldValid= /^[A-z][a-z0-9_-]{8,19}$/.test(e.target.value);
    }
  if(isFieldValid){
    const newUserInfo = {...user}
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }


  return (
 
    <div style={{textAlign: 'center'}}>
     
         {
          user.isSignedIn?  <button onClick={signOut}>Sign out</button>:
          <button className="btn" onClick={googleSignIn}>Sign in</button>
        }
        <br/>
        <button onClick={facebookSignIn}>Facebook Sign in with Facebook</button>
       {
         user.isSignedIn && <div className="container"> 
           
           <h2>Welcome, {user.name}</h2>
          <p>Your email address is: {user.email}</p>
           <img src={user.photoURL} className="image" alt=""/>
            </div>   
       }
  
         <form onSubmit={handleSubmit}>
           <h1>Registration Form</h1>
           <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="New User" id=""/>
           <label htmlFor="New User">New user Sign Up</label>
           <br/>
          {newUser &&  <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" id="name"/>}
           <br/>
           <input type="text" onBlur={handleBlur} name="email" id="email" placeholder="Your email here" required/>
           <br/>
           <input type="password" onBlur={handleBlur} name="password" id="password" placeholder="Your Password here"  required/>
           <br/>
           <input type="submit" value={newUser ? 'Sign Up':'Log In'}/>
         </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success &&  <p style={{color: 'green'}}>Your {newUser ?'registration' : 'Logged In'} was successfully</p>}
    </div> 
  );
}

export default Login;
