import React, { useContext, useEffect, useState } from 'react'
import Postagem from '../../models/Postagem'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { DNA } from 'react-loader-spinner'
import CardPostagens from './CardPostagens'
import { buscar } from '../../services/Service'
import { toastAlerta } from '../../utils/toastAlerta'

function ListaPostagens() {
    const [postagens, setPostagens] = useState<Postagem[]>([])

    let navigate = useNavigate()

    const {usuario} = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagens() {
        await buscar('/postagens', setPostagens, {
            headers: {
                Authorization: token,
            }
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa fazer login para acessar esta página.', 'erro')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    function criarPostagem() {
        navigate('/criarPostagem')
    }

    return (
        <>
            {postagens.length === 0 &&
                <>
                    <DNA
                        visible={true}
                        height='200'
                        width='200'
                        ariaLabel='dna-loading'
                        wrapperStyle={{}}
                        wrapperClass='dna-wraper mx-auto'/>
                    <p>Parece que nada foi postado ainda...</p>
                </>}
            
            <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {postagens.map((postagem) => (
                    <>
                        <CardPostagens key={postagem.id} post={postagem} />
                    </>
                ))}
            </div>
            <button onClick={criarPostagem} className='mb-4'>Deseja criar uma postagem?</button>
        </>
    )
}

export default ListaPostagens