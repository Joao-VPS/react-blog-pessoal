import React, { useState } from 'react'
import './Card.css'

interface CardProperties{
    name: string;
}

function Card(props:CardProperties) {
  const [quantity, setQuantity] = useState(0);

  function addItem() {
    setQuantity(quantity + 1);
  }

  function removeItem() {
    if (quantity > 0) {
        setQuantity(quantity - 1);
    } else {
        setQuantity(0);
    }
  }

  return (
    <div className='card-container'>
        <p className='card-item'>{props.name}</p>
        <button className='card-button' onClick={removeItem}>-</button>
        <p className='card-quantity'>{quantity}</p>
        <button className='card-button' onClick={addItem}>+</button>
    </div>
  )
}

export default Card