import React, { useContext, useEffect, useState } from 'react'
import Postagem from '../../models/Postagem'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { buscar, deletar } from '../../services/Service'
import { toastAlerta } from '../../utils/toastAlerta'

interface DeletarPostagemProps {

}

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const {id} = useParams<{id: string}>()

  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou. Faça o login novamente!', 'erro')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'erro')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  function retornar() {
    navigate('/postagens')
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token
        }
      })

      toastAlerta('Postagem deletada com sucesso', 'sucesso')
    } catch (error) {
      toastAlerta('Erro ao apagar postagem', 'erro')
    }

    retornar()
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h2 className='text-4xl text-center my-4'>Deletar postagem</h2>
      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>
      
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Postagem</header>
        <div className='p-4'>
          <p className='text-xl h-full'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className='flex'>
          <p onClick={retornar}
            className='text-slate-100 bg-indigo-400 hover:bg-indigo-600 hover:text-indigo-300  w-full py-2 duration-300'>Não</p>
          <p onClick={deletarPostagem}
            className='text-slate-100 bg-red-400 hover:bg-red-600 hover:text-red-300 w-full flex items-center justify-center duration-300'>Sim</p>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem