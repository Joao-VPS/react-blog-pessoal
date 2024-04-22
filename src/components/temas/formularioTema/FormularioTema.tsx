import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import Tema from '../../../models/Tema';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioTema() {
    const [tema, setTema] = useState<Tema>({} as Tema);

    let navigate = useNavigate();

    const { id } = useParams<{id: string}>();

    const {usuario, handleLogout} = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: token,
                }
            })
        } catch(error: any) {
            if(error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'erro')
                handleLogout()
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
            toastAlerta('Você precisa estar logado', 'erro');
            navigate('/login')
        }
    })

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })

        console.log(JSON.stringify(tema))
    }

    function mostrarErro(error: any) {
        let errorList = error.response.data.errors

        if (errorList.length === 0) {
            toastAlerta('Erro ao cadastrar o tema', 'erro')
        } else {
            errorList.map((erro: {defaultMessage: string}) => {
                toastAlerta(erro.defaultMessage, 'erro')
            })
        }
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if(id !== undefined){
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema atualizado com sucesso', 'sucesso')
                retornar()

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('Seu tempo expirou, faça o login novamente', 'erro')
                    handleLogout()
                } else {
                    mostrarErro(error)
                }
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema cadastrado com sucesso', 'sucesso')
                retornar()
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('Seu tempo expirou, faça o login novamente', 'erro')
                    handleLogout()
                } else {
                    mostrarErro(error)
                }
            }
        }
    }

    function retornar() {
        navigate('/temas')
    }

    return (
        <div className='container flex flex-col items-center justify-center mx-auto'>
            <h1 className='text-4xl text-center my-8'>
                {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
            </h1>

            <form className='w-1/2 flex flex-col gap-4' onSubmit={gerarNovoTema}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input
                        type="text"
                        placeholder='Descrição'
                        name='descricao'
                        className='border-2 border-slate-700 rounded p-2'
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <button
                    className='rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block'
                    type='submit'>
                    {id === undefined ? 'Cadastrar' : 'Editar'}
                </button>
            </form>
        </div>
    )
}

export default FormularioTema