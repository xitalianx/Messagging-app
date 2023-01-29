import React, { useEffect } from 'react';
import './App.css';
import Cryptogram from './components/Cryptogram';
import {auth} from './firebase';
import {useSelector,useDispatch} from 'react-redux'
import {selectUser, login, logout} from './features/userSlice'
import Login from './components/Login'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  console.log(user);
  

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            //photo: authUser.photoURL
            email: authUser.email,
            displayName: authUser.displayName
          })
        );
        console.log(user);
      } else {
        dispatch(logout())
      }
    });
  }, [dispatch]);

  return (
    <div className='app'> 
    {user ? <Cryptogram /> : <Login />}
    </div>
  );
}
export default App;