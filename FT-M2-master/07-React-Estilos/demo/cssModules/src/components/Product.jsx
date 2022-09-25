import React from 'react';
import s from  './Product.css';

const pStyle = {
  margin: '40px',
  border: '5px solid pink'
}

function Product(props) {
  console.log('esto es s:', s); // s es un objeto 
  return (
    <div className={`${s.producto} ${s.hola}`} style={pStyle}>
      <h3 className={s.hola}>{props.title}</h3>
      <p>{props.price}</p>
    </div>
  );
}

export default Product;
