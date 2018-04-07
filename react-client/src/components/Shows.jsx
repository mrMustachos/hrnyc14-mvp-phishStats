import React, { Component } from 'react';
import _ from 'lodash';
import moment from '../utils/moment';

import DateBox from './DateBox.jsx';
import SetsByYear from './SetsByYear.jsx';
import SetList from './SetList.jsx';


class Shows extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			listShows: 0
		}

		this.listShows = this.listShows.bind(this);
	}

	listShows(year) {
		this.setState({ listShows: year })
	}

	render() {
		return (
			<div>
				{
					this.props.testLoader
					? ( this.state.listShows > 0
						? <SetsByYear
								shows={ this.props.shows }
								getSetlist={ this.props.getSetlist }
								showYear={ this.state.listShows }
								listYear={ this.listShows }
							/>
						: <DateBox
								shows={ this.props.shows }
								listYear={ this.listShows }
							/>
						)
					: ( this.props.setListLoader
						? <div className="loader"></div>
						: <SetList clearDate={ this.props.clearDate } setData={ this.props.setData } />
						)
				}
			</div>
		);
	}
};

export default Shows;