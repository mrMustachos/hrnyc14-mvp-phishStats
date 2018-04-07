import React from 'react';
import _ from 'lodash';


const DateBox = (props) => {
	const dateBoxes = _.map(_.uniqBy(props.shows, 'year'), (show, i) => (
		<p key={ i }
			className="yearBox"
			onClick={ () => props.listYear(show.year) }
		>
			{ show.year }
		</p>
	));

	return (
		<div>
			<p className="counter center">
				There are { props.shows.length } sets.
			</p>
			{ dateBoxes }
		</div>
	);
};


export default DateBox;