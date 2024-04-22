import React, { useContext } from 'react'
import Postagem from '../../models/Postagem'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toastAlerta'

interface CardPostagemProps{
    post: Postagem
}

function CardPostagens({ post }: CardPostagemProps) {
  const {usuario} = useContext(AuthContext)
  const navigate = useNavigate()

  function goToPost() {
    navigate(`/post/${post.id}`)
  }

  function copyLink() {
    let link = window.location.hostname + '/post/' + post.id
    navigator.clipboard.writeText(link)
  }

  return (
    <div className='border-slate-900 border flex flex-col rounded-xl overflow-hidden justify-between h-min'>
      <div onClick={goToPost}>
        <div className='flex w-full bg-indigo-400 py-2 px-4 items-center gap-4'>
          <img src={post.usuario?.foto} className='h-12 rounded-full' alt={`Foto de ${post.usuario?.nome}`} />
          <h3 className='text-lg font-bold text-center uppercase'>{post.usuario?.nome}</h3>
        </div>
        <div className='p-4'>
          <h4 className='text-lg font-bold uppercase'>{post.titulo}</h4>
          <p>Tema: {post.tema?.descricao}</p>
          <p className='py-4 font-semibold'>{post.texto}</p>
          <p>Data: {new Intl.DateTimeFormat(undefined, {
            dateStyle: 'full',
            timeStyle: 'medium',
          }).format(new Date(post.data))}</p>
        </div>
      </div>
      <div className='flex justify-between'> 
        { post.usuario?.id === usuario.id ? <>
          <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-800 hover:text-indigo-400 flex items-ceter justify-center duration-300 py-2'>
            Editar
          </Link>
          <Link to={`/deletarPostagem/${post.id}`} className='w-full text-white bg-red-400 hover:bg-red-700 hover:text-red-300 flex items-center justify-center duration-300 py-2'>
            Deletar
          </Link>
        </> : <div /> }
        <p onClick={copyLink}
          className='w-full text-white bg-indigo-400 hover:bg-indigo-800 hover:text-indigo-400 flex items-ceter justify-center duration-300 py-2'>Compartilhar</p>
      </div>
    </div>
  )
}

export default CardPostagens