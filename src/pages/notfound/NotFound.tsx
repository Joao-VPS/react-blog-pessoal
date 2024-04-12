import React from 'react'
import { Bomb } from '@phosphor-icons/react'

function NotFound() {
  return (
    <div className='flex justify-center items-center bg-indigo-900'>
        <Bomb size={128} weight='bold'/>
        <h2 className='text-5xl'>NotFound</h2>
    </div>
  )
}

export default NotFound