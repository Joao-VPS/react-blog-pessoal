import React from 'react'
import Postagem from '../../models/Postagem'

interface CardPostagemPorps{
    postagem: Postagem
}

function CardPostagens({ postagem }: CardPostagemPorps) {
  return (
    <div className='border'>
      <header>Postagem</header>
    </div>
  )
}

export default CardPostagens