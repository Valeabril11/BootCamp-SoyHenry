import React from "react";
import e from "../components/styles/Card.module.css";
export default function Card(props) {
  console.log(props);
  // acá va tu código
  let { img, max, min, name, onClose } = props;
  return (
    <div className={e.card}>
      <button className={`${e.btn}`} onClick={onClose}>
        x
      </button>
      <h2>{name}</h2>
      <div>
        <p className={e.temp}>Max {max - 273.15}</p>
        <p className={e.temp}>Min {min - 273.15}</p>
      </div>
      <img className={`${e.img}`} src={`http://openweathermap.org/img/wn/${img}@2x.png`}alt=""/>
    </div>
  );
}
