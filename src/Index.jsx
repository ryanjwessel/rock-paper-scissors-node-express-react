import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

// Styles
import './main.scss';

const Choice = ( props ) => {
	return (
		<button
			type="button"
		>
			{ props.name }
		</button>
	);
};

const App = () => {
	const choices = [ 'rock', 'paper', 'scissors' ];

	return (
		<div className="container">
			<h1>Rock Paper Scissors!</h1>
			<h2>Choose your weapon...</h2>
			{
				choices.map( item => {
					return <Choice key={ item } name={ item } />;
				})
			}
		</div>
	);
};

render(
	<App />,
	document.getElementById('root')
);