import React, { useContext } from 'react'
import Postagem from '../../models/Postagem'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

interface CardPostagemPorps{
    post: Postagem
}

function CardPostagens({ post }: CardPostagemPorps) {
  const {usuario} = useContext(AuthContext)

  return (
    <div className='border-slate-900 border flex flex-col rounded-xl overflow-hidden justify-between h-min'>
      <div>
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
      { post.usuario?.id === usuario.id ? <div className='flex'>
        <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-800 hover:text-indigo-400 flex items-ceter justify-center duration-300 py-2'>
          Editar
        </Link>
        <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 hover:bg-red-700 hover:text-red-300 w-full flex items-center justify-center duration-300 py-2'>
          Deletar
        </Link>
      </div> : <div /> }
    </div>
  )
}

export default CardPostagens