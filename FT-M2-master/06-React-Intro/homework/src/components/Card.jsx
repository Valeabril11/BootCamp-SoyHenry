import React from "react";

export default function Card(props) {
  console.log(props);
  // acá va tu código
  let { img, max, min, name, onClose } = props;
  return (
    <div>
      <button onClick={onClose}>botonsinX</button>
      <h2>Ciudad: {name}</h2>
      <div>
        <h4>Max {max}</h4>
        <h4>Min {min}</h4>
      </div>
      <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt="" />
    </div>
  );
}
