import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import titanicJSON from '../training_json/titanic.json';

console.log(`hi it works ${JSON.stringify(titanicJSON[0])}`);

const vDOM = document.getElementById('app');

ReactDOM.render(<Main />, vDOM);