import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
   if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
   }
}

export   const handleGoogleSignIn = () => {
    const  provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
     const {displayName,email,photoURL} = res.user;
     const signedInUser ={
       isSignedIn: true,
       name:displayName,
       email:email,
       photoURL:photoURL,
       success: true,
     }
     return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.massage);
    })
  }


export  const handleSignInFacebook = () => {
    var FacebookProvider = new firebase.auth.FacebookAuthProvider();
       return firebase.auth().signInWithPopup(FacebookProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode,errorMessage,email,credential);
      // ...
    });
  }


    export const handleSignOut = () => {
       return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name:'',
        email:'',
        photoURL:'',
        error: '',
        newUser: '',
        success: false
      }
      return signedOutUser;
    })
    .catch(err => {
      console.log(err.massage);
    })
  }


  export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch( error => {
      // Handle Errors here.
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.error = error.message;
      return newUserInfo;
    });
  }



  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo =res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
        return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.error = error.message;
      return newUserInfo;
    });
  }


  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully');
    }).catch(function(error) {
      console.log(error);
    });
  }
