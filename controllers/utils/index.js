const { phishKey } = require('../../config/keys');
const _ = require('lodash');

exports.options = (url, qs) => {
	qs = qs || {};
	var obj = {
		uri: `https://api.phish.net/v3${url}`,
		qs: { apikey: phishKey },
		headers: { 'User-Agent': 'Request-Promise' },
		json: true
	}
	_.assign(obj.qs, qs);

	return obj;
};

exports.currentYear = (new Date()).getFullYear();

exports.consolidateAllShows = (raw) => {
	const cleanUp =_.chain(raw)
		.map(info => info.response)
		.flatMap(item => _.map(item.data))
		.filter((id) => {
			if (id.artistid === 1) return id;
		})
		.forEach(date => {
			var temp = date.showdate.split('-');
			var locationClean = date.location.replace(/, ,/g, ',').replace(/, USA/g, '');

			date.display_date = `${temp[1]}/${temp[2]}/${temp[0]}`;
			date.year = parseInt(temp[0]);
			date.location = locationClean;
			date.liked = 'star_border';
		})
	.value();

	return cleanUp;
};