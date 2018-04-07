import React from 'react';
import _ from 'lodash';


const SetList = (props) => {
	const setList = _.map(props.setData.setlistdata, (song, i) => (
		<div key={ i } className="row">
			<span className="track">{ song.track }</span>
			<span className="title">{ song.song_name }{ song.next_song === 'transition' ? ' >' : '' }</span>
			<span className="set">{ song.set }</span>
		</div>
	));

	return (
		<div>
			<p className="counter">
				<span className="back" onClick={ () => props.clearDate() }><span className="arrow">&larr;</span>Back</span>
			</p>
			<div className="row header">
				<span className="track">Track</span>
				<span className="title">Title</span>
				<span className="set">Set</span>
			</div>
			{ setList }
		</div>
	);
};


export default SetList;