import React from 'react'
import Sidebar from './Sidebar'
import Thread from './Thread'
import './Cryptogram.css'

const Cryptogram = () => {
  return (
    <div className='cryptogram'>
        <Sidebar/>
        <Thread/>
    </div>
  )
}

export default Cryptogram