import React, { useContext, useEffect, useState } from 'react'
import Postagem from '../../models/Postagem'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { buscar } from '../../services/Service'

function FormularioPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{id: string}>()

  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token

  function invalidRequest() {
    alert('Sessão inválida. Faça o login novamente!')
    handleLogout()
  }

  function invalidToken() {
    alert('Sessão inválida. Faça o login novamente!')
    navigate('/login')
  }

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {Authorization: token}
      })
    } catch(error: any) {
      if (error.toString().includes('403')) {
        invalidRequest()
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  useEffect(() => {
    if (token === '') {
      invalidToken()
    }
  })

  function atualizarEstado() {

  }

  return (
    <div>FormularioPostagem</div>
  )
}

export default FormularioPostagem