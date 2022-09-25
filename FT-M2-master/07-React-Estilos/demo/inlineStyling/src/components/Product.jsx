import React from 'react';

const divStyle = {
  margin: '80px',
  border: '5px solid pink',
};
const pStyle = {
  fontSize: '50px',
  textAlign: 'center',
};

function Product(props) {
  return (
    <div style={divStyle}>
      <h3>{props.title}</h3>
      <p style={pStyle}>{props.price}</p>
    </div>
  );
}

export default Product;
