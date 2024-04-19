import React from 'react'
import './ModalPostagem.css'
import Popup from 'reactjs-popup'
import FormularioPostagem from './FormularioPostagem'
import 'reactjs-popup/dist/index.css'

function ModalPostagem() {
  return(
    <Popup
    contentStyle={{backgroundColor: 'transparent', border: 'none'}}
      trigger={<button className='border rounded px-4 hover:bg-white hover:text-indigo-800'>Nova postagem</button>} modal>
      <div className='dark:bg-slate-800 rounded-lg pb-8'>
        <FormularioPostagem />
      </div>
    </Popup>
  )
}

export default ModalPostagem