const el = React.createElement;

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return el(
			'p',
			{},
			'Beginnings of a React app.'
		);
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(el(App), domContainer);