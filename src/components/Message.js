import React from 'react'
import { Avatar } from '@material-ui/core'
import './Message.css'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

const Message = ({id, data: { timestamp, displayName, email, message, photo, uid} }) => {
    const user = useSelector(selectUser)
    return (
        <div className={` message ${user.email === email && `message_sender`}`}>
            <Avatar src={photo} className='message_photo'/>
            <div className='message_contents'>
                <p>{message}</p>
                <small>timestamp</small>
            </div>
        </div>
    )
}

export default Message