import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import Postagem from '../../models/Postagem'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { atualizar, buscar, cadastrar } from '../../services/Service'
import Tema from '../../models/Tema'
import { toastAlerta } from '../../utils/toastAlerta'

function FormularioPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{id: string}>()

  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token

  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {Authorization: token}
    })
  }

  async function buscarTemaPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  async function buscarTemas() {
    await buscar('/temas', setTemas, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'erro')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarTemas()
    if (id !== undefined) {
      buscarPostagemPorId(id)
      console.log(tema)
    }
  }, [id])

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema
    })
  }, [tema])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario
    })
  }

  function retornar() {
    navigate('/postagens')
  }

  function mostrarErro(error: any) {
    let errorList = error.response.data.errors

    if (errorList === 0) {
      if (id != undefined) {
        toastAlerta('Erro ao atualizar postagem','erro')
      } else {
        toastAlerta('Erro ao criar postagem', 'erro')
      }
    } else {
      errorList.map((erro: {defaultMessage: string}) => {
        toastAlerta(erro.defaultMessage, 'erro')
      })
    }
  }
  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({postagem})

    if (id != undefined) {
      try {
        await atualizar('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })
        toastAlerta('Postagem atualizada com sucesso', 'sucesso')
        retornar()
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('Sua sessão expirou. Faça o login novamente', 'erro')
          handleLogout()
        } else {
          mostrarErro(error)
        }
      }
    } else {
      try {
        await cadastrar('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })
        toastAlerta('Postagem criada com sucesso', 'sucesso')
        retornar()
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou. Faça o login novamente', 'erro')
          handleLogout()
        } else {
          mostrarErro(error)
        }
      }
    }
  }

  const carregandoTema = tema.descricao === ''

  return (
    <div className='container flex flex-col mx-auto items-center'>
      <h1 className='text-4xl text-center my-8'></h1>
      <form className='flex flex-col w-1/2 gap-4' onSubmit={gerarNovaPostagem}>
        <div className='flex flex-col gap-2'>
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            type="text"
            value={postagem.titulo}
            placeholder='Título'
            name="titulo"
            required
            aria-errormessage='Este campo é obrigatório'
            className='border-2 border-slate-700 rounded p-2'
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            type="text"
            value={postagem.texto}
            placeholder='Texto'
            name="texto"
            required
            aria-errormessage='A postagem deve ter um texto'
            className='border-2 border-slate-700 rounded p-2'
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className='flex flex-col gap-2'>
          <p>Tema da postagem</p>
          <select
            name="tema"
            id="tema"
            className='border p-2 border-slate-800 rounded'
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
            <option value='' selected disabled>Selecione um tema</option>

            {temas.map((tema) => (
              <>
                <option value={tema.id} >{tema.descricao}</option>
              </>
            ))}

          </select>
        </div>
        <button type='submit' className='tounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white'>
          {carregandoTema ? <span>Carregando</span> : id !==undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

export default FormularioPostagem