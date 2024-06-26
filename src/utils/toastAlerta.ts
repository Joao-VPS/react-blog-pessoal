import React from 'react'
import { toast } from 'react-toastify'

export function toastAlerta(mensagem: string, tipo: 'sucesso' | 'info' | 'erro') {
  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined
      })
      break
    
    case 'info':
      toast.info(mensagem, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined
      })
      break
    
    case 'erro':
      toast.error(mensagem, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined
      })
      break
  }
}