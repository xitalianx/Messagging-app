import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import {PhoneOutlined, QuestionAnswerOutlined, Settings} from '@material-ui/icons'
import SidebarThreads from './SidebarThreads'
import {logout, selectUser} from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import db, { auth } from '../firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const Sidebar = () => {
  const user = useSelector(selectUser);
  const[threads, setThread] = useState([]);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    db.collection('threads').onSnapshot((snapshot) => setThread(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))))
  }, [])

  const addThread = () => {
    const threadName = prompt("Enter a thread name.");
    const destinatario = prompt("Enter mail address of receiver.")
    if(threadName){
      db.collection('threads').add({
        threadName: threadName,
        username: user.uid,
        receiver: destinatario
      })
    }
  }

  console.log(threads)


  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
  };
  return (
    <div className='sidebar'>
      <div className='logout_button'>
      <button onClick={Logout}>Logout</button>
      </div>
      <div className='sidebar_header'>
        
        <div className='sidebar_search'>
          <SearchIcon className='sidebar_searchIcon'/>
          <input placeholder='Search' className='sidebar_input'></input>
        </div>
        <IconButton variant='outlined' id='sidebar_button' onClick={addThread}>
        Scrivi
        </IconButton>
      </div> 
      <div className='sidebar_threads'>
        {threads
          .filter(({data}) => {return (data.username === currentUser.uid)||(data.receiver === currentUser.email)})
          .map(({id, data : {threadName}}) => (
          <SidebarThreads key={id} id={id} threadName={threadName}/>
        ))}
      </div>
      <div className='sidebar_bottom'>
        <Avatar/>
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined/>
        </IconButton>
        <IconButton>
           <Settings/>
        </IconButton>
      </div>
    </div>
  )
}

export default Sidebar
