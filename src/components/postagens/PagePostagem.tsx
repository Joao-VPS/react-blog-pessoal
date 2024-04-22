import React, { useContext, useEffect, useState } from 'react'
import Postagem from '../../models/Postagem'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buscar } from '../../services/Service'
import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toastAlerta'
import NotFound from '../../pages/notfound/NotFound'
import CardPostagens from './CardPostagens'

function PagePostagem() {
  const [post, setPostagem] = useState<Postagem>({} as Postagem)
  const { usuario } = useContext(AuthContext)
  const token = usuario.token
  const { id } = useParams<{id: string}>()

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token
        }
      })
    } catch (error: any) {
      error.response.data.errors.map((erro: {defaultMessage: string}) => {
        toastAlerta(erro.defaultMessage, 'erro')
      })
    }
  }
  
  useEffect(() => {
    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  return (
    <>
      {post.id !== undefined ?
      <div className='container mx-auto my-4 w-full'>
        <CardPostagens key={post.id} post={post} />
      </div> : <NotFound />}
    </>
  )
}

export default PagePostagem