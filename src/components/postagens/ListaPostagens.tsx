import React, { useContext, useEffect, useState } from 'react'
import Postagem from '../../models/Postagem'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { DNA } from 'react-loader-spinner'
import CardPostagens from './CardPostagens'
import { buscar } from '../../services/Service'

function ListaPostagens() {
    const [postagens, setPostagens] = useState<Postagem[]>([])

    let navigate = useNavigate()

    const {usuario, handleLogout} = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {Authorization: token}
            })
        } catch(error: any) {
            if (error.toString().includes('403')) {
                alert('Sessão inválida. Faça o login novamente!')
                handleLogout
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa fazer login para acessar esta página.')
            navigate('/login')
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
                    <button onClick={criarPostagem}>Deseja criar uma postagem?</button>
                </>}
            
            <div>
                {postagens.map((postagem) => (
                    <>
                        <CardPostagens key={postagem.id} postagem={postagem} />
                    </>
                ))}
            </div>
        </>
    )
}

export default ListaPostagens