const db = require('../database-mysql');
const _ = require('lodash');
const requestP = require('request-promise-native');
const setCleaner = require('./utils/setCleaner');
const { currentYear, options, consolidateAllShows } = require('./utils');


// exports.getPLACEHOLDER = async (req, res) => {
// 	const queryStr = 'SELECT * FROM categories';
// 	const transactions = await db.query(queryStr);
// 	res.send(transactions);
// };

// exports.postPLACEHOLDER = async (req, res) => {
// 	const params = [req.body.target, req.body.title];
// 	const queryStr = 'INSERT INTO categories (target, title) VALUES (?, ?)';
// 	const user = await db.query(queryStr, params);
// 	res.sendStatus(201);
// };

exports.allShows = async (req, res) => {
	var allShows = [];
	for (var i = 1982; i <= currentYear; i++) {
		allShows.push(requestP(options('/shows/query', { year: i, order: 'ASC' })));
	}
	const shows = await Promise.all(allShows);
	const results = consolidateAllShows(shows)
	res.send(results);
};

exports.collectSetData = async (req, res, next) => {
	const setlistPromise = requestP(options('/setlists/get', { showid: req.body.showid }));
	const jamchartPromise = requestP(options('/jamcharts/all'));
	
	const [setlist, jamchart] = await Promise.all([setlistPromise, jamchartPromise]);
	const baseData = await setCleaner(setlist.response.data[0], jamchart.response.data);

	res.locals.baseData = baseData;
	next();
};

exports.generateSetlist = async (req, res) => {
	const baseData = req.res.locals.baseData;
	const jamId = baseData.jam_id;
	var jamDeets = [];

	for (var i = 0; i < jamId.length; ++i) {
		jamDeets.push(requestP(options('/jamcharts/get', { songid: jamId[i] })));
	}
	const test = await Promise.all(jamDeets);
	// console.log(JSON.stringify(test))

	res.send(baseData);
};