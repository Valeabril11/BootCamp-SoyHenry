import React from 'react';
import { render } from 'react-dom';
import Product from './src/components/Product.jsx';
import './src/global.gcss';

render(<Product title="Prueba" price={400}/>, document.getElementById('app'));
