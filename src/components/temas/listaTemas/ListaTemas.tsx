import React, { useContext, useEffect, useState } from 'react'
import CardTemas from '../cardTemas/CardTemas'
import Tema from '../../../models/Tema';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Service';
import { DNA } from 'react-loader-spinner';
import { toastAlerta } from '../../../utils/toastAlerta';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);

  let navigate = useNavigate()

  const {usuario, handleLogout} = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: {Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')){
        toastAlerta('Sua sessão expirou', 'erro')
        handleLogout
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'erro');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  function criarTema() {
    navigate('/cadastroTema')
  }

  return (
    <>
      {temas.length === 0 && (
        <>
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel='dna-loading'
            wrapperStyle={{}}
            wrapperClass='dna-wrapper mx-auto' />

          <p>Parece que nenhum tema foi criado ainda...</p>
          <button onClick={criarTema}>Deseja criar um tema?</button>
        </>
      )}

      <div className='flex justify-center w-full my-4'>
        <div className='container flex flex-col'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

            {temas.map((tema) => (
              <>
                <CardTemas key={tema.id} tema={tema}/>
              </>
            ))}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaTemas