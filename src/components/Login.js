import React from 'react'
import { useState } from 'react'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'
import './Login.css'

const Login = () => {
  const [mail, setMail] = useState("");
  const [passw, setPassw] = useState("");

  const signIn = (mail,passw) => {
    auth.signInWithEmailAndPassword(mail, passw)
  .then(() => {
    console.log('Accesso effettuato con successo!');
  })
  .catch((error) => {
    console.error(error);
    alert(error.message);
  });
  }

  
    const register = (mail,passw) => {
      auth.createUserWithEmailAndPassword(mail, passw)
  .then(() => {
    console.log('Utente creato con successo!');
  })
  .catch((error) => {
    console.error(error);
    alert(error.message);
  });}

  

  return (
    <div className='login'>
      <div className='login_cryptogram'>  
        <img src="https://banner2.cleanpng.com/20180816/soc/kisspng-computer-icons-portable-network-graphics-telegram-5b75488d0037b6.7670323315344129410009.jpg"/>
        <br/>
        <h1>Cryptogram</h1>
        </div>
      <br/>
      <form>
        <label>
          Mail:
          <br/>
          <input type="text" value={mail} onChange={(event) => setMail(event.target.value)}/>
        </label>
        <br/>
        <label>
          Password:
          <br/>
          <input type="text" value={passw} onChange={(event) => setPassw(event.target.value)}/>
        </label> 
      </form>
      <br/>
      <br/>
      <Button onClick={()=> signIn(mail,passw)}>Sign in</Button>
      <br/>
      <Button onClick={()=> register(mail,passw)}>Register</Button>
      </div>    

  )
  }


export default Login
