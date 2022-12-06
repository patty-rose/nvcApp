// import { auth } from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState, useCallback } from "react";

const Login = () => {
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [signInMessage, setSignInMessage] = useState(null);
  const [signOutMessage, setSignOutMessage] = useState(null);

  const auth = getAuth()
  console.log(auth);

  const doSignUp = useCallback(async e => {
      e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSignUpMessage(`You've successfully signed up, NAME!`);
    } catch (error) {
      setSignUpMessage(`There was an error signing up: ${error.message}!`);
    }
  }, [])

  const doSignIn = useCallback(async e => {
    e.preventDefault()
    const email = e.target.signinEmail.value;
    const password = e.target.signinPassword.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSignInMessage(`You've successfully signed in as ADD USER NAME HERE!`);
    } catch (error) {
      setSignInMessage(`There was an error signing in: ${error.message}!`)
    }
  }, [])




  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       setSignInMessage(`You've successfully signed in as ${userCredential.user.email}!`)
  //     })
  //     .catch((error) => {
  //       setSignInMessage(`There was an error signing in: ${error.message}!`)
  //     });
  // }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutMessage("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutMessage(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      {signUpMessage}
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>

      <h1>Sign In</h1>
      {signInMessage}
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>

      <h1>Sign Out</h1>
      {signOutMessage}
      <br />
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default Login