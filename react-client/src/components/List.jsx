import React from 'react';
import _ from 'lodash';
import ListItem from './ListItem.jsx';


const List = (props) => {
	const dateBoxes = _.map(_.uniqBy(props.shows, 'year'), (show) => <p className="yearBox">{ show.year }</p>);
	return (
		<div>
			<h4> List Component </h4>
			<p>There are { props.shows.length } items.</p>
			{ dateBoxes }
		</div>
	);
};


export default List;