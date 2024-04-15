
import React, { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Home() {
  const { usuario, handleLogout } = useContext(AuthContext);

  return (
    <div className='flex justify-center items-center'>
      <div>
        <h2 className="text-slate-900 dark:text-slate-300 text-5xl  my-4">Logar</h2>
        <h2 className="text-slate-900 dark:text-slate-300 text-4xl ">Ola user : {usuario.nome}</h2>
        <Link to="/login" className="my-4 rounded bg-indigo-400
         hover:bg-indigo-900 text-white w-1/2 m-auto py-2 flex justify-center">
          Voltar 
        </Link>
      </div>
    </div>
  );
}

export default Home;

/* import React, { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const { nome, setNome } = useContext(UserContext);

  return (
    <div className='flex justify-center items-center'>
      <div>
        <h2 className="text-slate-900 text-5xl  my-4">Logar</h2>
        <h2 className="text-slate-900 text-4xl ">Ola user : {nome}</h2>
        <Link to="/login" className="my-4 rounded bg-indigo-400
         hover:bg-indigo-900 text-white w-1/2 py-2 flex justify-center">
          Voltar 
        </Link>
      </div>

    </div>
  );
}

export default Home; */

/* import homeLogo from '../../assets/img/home.jpg'
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'
import Card from '../../components/card/Card';

function Home() {
  return (
    <>
      <div className='bg-indigo-900 flex justify-center'>
        <div className='container grid grid-cols-2 text-white'>
          <div className='flex flex-col gap-4 items-center justify-center py-4'>
            <h2 className='text-5xl font-bold'>Seja bem-vindo!</h2>
            <p className='text-xl'>Expresse aqui seus pensamentos e opinões</p>
            <div className='flex justify-around gap-4'>
              <button className='rounded bg-white text-blue-800 py-2 px-4'>Ver postagens</button>
            </div>
          </div>
          <div className='flex justify-center'>
            <img src={homeLogo} alt="" className='w-2/3'/>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home */

/* <h1 className="title">{props.title}</h1>
        <p>{props.description}</p>
        <p>Este é o início de meu blog pessoal, usado principalmente para quem se interessa em saber mais sobre minha caminhada profissional. Ao longo desse blog, você verá desde minha trajetória de vida, meus principais projetos e até mesmo os conhecimentos adquiridos ao longo de todos esses anos de vida. Sinta-se em casa e livre para entrar em contato a qualquer momento.</p>
        <p>Att: João Sabino</p>
        <img src={homeImage} alt="Imagem do início" /> */