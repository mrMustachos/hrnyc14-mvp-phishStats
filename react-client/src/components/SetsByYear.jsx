import React from 'react';
import _ from 'lodash';
import moment from '../utils/moment';

const SetsByYear = (props) => {
	const showYear = _.map(_.filter(props.shows, (years) => years.year === props.showYear), (show) => (
		<div
			key={ show.showid }
			className="row"
			onClick={ () => props.getSetlist(show.showid) }
		>
			<span className="date">{ moment(show.showdate) }</span>
			<span className="venue">{ show.venue }</span>
			<span className="location">{ show.location }</span>
		</div>
	));

	return (
		<div>
			<p className="counter">
				There where { showYear.length } sets in { props.showYear }.
				<span className="back" onClick={ () => props.listYear(0) }><span className="arrow">&larr;</span>Back</span>
			</p>
			<div className="row header">
				<span className="date">Date</span>
				<span className="venue">Venue</span>
				<span className="location">Location</span>
			</div>
			{ showYear }
		</div>
	);
};


export default SetsByYear;