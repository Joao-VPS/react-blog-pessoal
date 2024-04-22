import { Link, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toastAlerta'


function Navbar() {
  let navigate = useNavigate()
  
  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    toastAlerta('Usuário deslogado com sucesso', 'sucesso')
    navigate('/login')
  }

  let navBarComponent

  if (usuario.token !== "") {
    navBarComponent = (<>
      <div className='fixed w-full bg-indigo-900 text-white flex justify-center py-4'>
        <div className="container flex justify-between text-lg">
          <div className='text-2xl font-bold uppercase'>Blog Pessoal</div>
  
          <div className='flex flex-wrap gap-4'>
            <Link to='/home' className='hover:underline'>Home</Link>
            <Link to='/postagens' className='hover:underline'>Postagens</Link>
            <Link to='/temas' className='hover:underline'>Temas</Link>
            <Link to='/cadastroTema' className='hover:underline'>Cadastrar tema</Link>
            <Link to='/perfil' className='hover:underline'>Perfil</Link>
            <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
          </div>
        </div>
      </div>
      <div className='py-12 md:py-8'/>
    </>)
  } else if (window.location.pathname.includes('/post/')) {
    navBarComponent = (
      <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
        <div className="container flex justify-between text-lg">
          <div className='text-2xl font-bold uppercase'>Blog Pessoal</div>
  
          <div className='flex flex-wrap gap-4'>
            <Link to='/login' className='hover:underline'>Login</Link>
            <Link to='/cadastro' className='hover:underline'>Cadastrar</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
     { navBarComponent }
    </>
  )
}

export default Navbar

/* import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="w-full bg-indigo-900 text-white flex justify-center px-4 py-4">
        <ul className="container flex flex-wrap justify-between text-lg">
          <div className='text-2xl font-bold uppercase'>Blog Pessoal</div>
          <div className='flex gap-4'>
            <Link to='/home' className='hover:underline'>Home</Link>
            <Link to='/login' className='hover:underline'>Login</Link>
            <div className='hover:underline'>Postagens</div>
            <div className='hover:underline'>Temas</div>
            <div className='hover:underline'>Cadastrar tema</div>
            <div className='hover:underline'>Perfil</div>
            <div className='hover:underline'>Sair</div>
          </div>
        </ul>
    </div>
  )
}

export default NavBar */