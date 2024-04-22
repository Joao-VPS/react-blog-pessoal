import React, { useContext, useEffect, useState } from 'react'
import Tema from '../../../models/Tema'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../utils/toastAlerta'

function DeletarTema() {
    const [tema, setTema] = useState<Tema>({} as Tema)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('Sua sessão expirou, por favor faça o login novamente', 'erro')
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

    useEffect (() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate('/temas')
    }
    
    function mostrarErro(error: any) {
        let errorList = error.response.data.errors

        if (errorList.length === 0) {
            toastAlerta("Erro ao apagar tema", 'erro')
        } else {
            errorList.map((erro: {defaultMessage: string}) => {
                toastAlerta(erro.defaultMessage, 'erro')
            })
        }
    }

    async function deletarTema() {
        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Tema apagado com sucesso', 'sucesso')
            retornar()

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('Sua sessão expirou, faça o login novamente', 'erro')
                handleLogout()
            } else {
                mostrarErro(error)
            }
        }        
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className='flex'>
                    <p  onClick={retornar}
                        className='text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full py-2'>Não</p>
                    <p  onClick={deletarTema}
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full flex items-center justify-center'>Sim</p>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema