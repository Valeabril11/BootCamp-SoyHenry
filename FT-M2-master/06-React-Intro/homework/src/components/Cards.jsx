import React from 'react';
import cities from '../data';
import Card from './Card';

export default function Cards(props) {
  console.log(cities) // devuelve un arreglo de objetos
  // acá va tu código
  // tip, podés usar un map
  // <div>
  //  if (!props.cities) {return <h1> no hay ciudades disponibles</h1>} 
  // </div>
  return (<div>
{
  props.cities && props.cities.map(city => (
    <Card
    key = {cities.id}
    max={city.main.temp_max}
    min={city.main.temp_min}
    name={city.name}
    img={city.weather[0].icon}
    onClose={() => alert(city.name)}
  />
  ))
}
  </div>)
};