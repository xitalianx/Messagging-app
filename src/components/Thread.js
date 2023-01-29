import React, { useEffect } from 'react'
import './Thread.css'
import { Avatar, IconButton } from '@material-ui/core'
import { MicNoneOutlined, MoreHoriz, SendRounded, TimerOutlined } from '@material-ui/icons'
import { useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from '../firebase'
import { useSelector } from 'react-redux'
import { selectThreadId, selectThreadName } from '../features/threadSlice'
import { selectUser } from '../features/userSlice'
import Message from './Message'

const Thread = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const threadName = useSelector(selectThreadName)
  const threadId = useSelector(selectThreadId)
  const user = useSelector(selectUser)

  useEffect(() => {
    if(threadId) {
      db.collection('threads').doc(threadId).collection('messages').orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
       }))))
    }
  }, [threadId])

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('threads').doc(threadId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      //photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    }).then(() => {
      setInput('')
    })
  }

  return (
    <div className='thread'>
        <div className='thread_header'>
            <div className='thread_header_contents'>
              <Avatar/>
              <div className='thread_header_contents_info'>
                <h4>{threadName}</h4>
                <h5>Last Seen</h5>
              </div>
            </div>
            <IconButton>
              <MoreHoriz className='thread_header_details'/>
            </IconButton>
            </div>
            <div className='thread_messages'>
              {messages.map(({ id, data }) => (<Message key={id} data={data} />))}
              </div>
              <div className='thread_input'>
                <form>
                <input placeholder='Write messgaes..' type='text' value={input} onChange={(e) => setInput(e.target.value)}></input>
                <IconButton>
                  <TimerOutlined/>
                </IconButton>
                <IconButton onClick={sendMessage}>
                  <SendRounded/>
                  </IconButton>
                  <IconButton><MicNoneOutlined/></IconButton>
                  </form>
                </div>      
     </div>
  )
}

export default Thread  