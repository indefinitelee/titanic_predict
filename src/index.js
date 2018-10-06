import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import titanicJSON from '../training_json/titanic.json';

const vDOM = document.getElementById('app');

ReactDOM.render(<Main json={titanicJSON} />, vDOM);

 if (module.hot) {
	   module.hot.accept('./main/index.js', function() {
	   })
	 }