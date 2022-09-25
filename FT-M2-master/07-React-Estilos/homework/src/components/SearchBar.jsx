import React from 'react';
import b from '../components/styles/Cards.module.css'

export default function SearchBar(props) {
  // acá va tu código
  return(
    <div className={b.search}>
      <input type="text" placeholder={"Buscar..."}/>
      <button className={b.btn} onClick={()=>props.onSearch('Buscando ciudad')}>Agregar</button>
    </div>
  )
};