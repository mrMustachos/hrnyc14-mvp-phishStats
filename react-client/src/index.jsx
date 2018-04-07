import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Shows from './components/Shows.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			setListLoader: true,
			testLoader: true,
			startLoader: true,
			allshows: [],
			setData: []
		}

		this.getSetlist = this.getSetlist.bind(this);
		this.getAllShows = this.getAllShows.bind(this);
		this.clearSetList = this.clearSetList.bind(this);
	}

	getSetlist(id) {
		this.setState({ testLoader : false });
		axios.post('/api/setlist', { showid: id })
			.then((response) => {
				this.setState({
					setData : response.data,
					setListLoader: false
				});
			})
			.catch((err) => {
				console.error(err);
			}
		);
	}

	getAllShows() {
		axios.get('/api/allshows')
			.then((response) => {
				this.setState({
					allshows : response.data,
					startLoader: false
				});
			})
			.catch((err) => {
				console.error(err);
			}
		);
	}

	clearSetList() {
		this.setState({
			setData : [],
			setListLoader: true,
			testLoader: true
		});
	}

	componentDidMount() { this.getAllShows(); }

	render() {
		return (
			<div className="container">
				<h1>I CaN HaZ Phishez!!</h1>
				{
					this.state.startLoader
					? (<div className="loader"></div>)
					: (<Shows
							shows={ this.state.allshows }
							getSetlist={ this.getSetlist }
							setData={ this.state.setData }
							clearDate={ this.clearSetList }
							setListLoader={ this.state.setListLoader }
							testLoader={ this.state.testLoader }
						/>)
				}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));