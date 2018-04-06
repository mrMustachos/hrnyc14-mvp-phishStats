const db = require('../database-mysql');
const _ = require('lodash');
const requestP = require('request-promise-native');
const setCleaner = require('./utils/setCleaner');
const { currentYear, options } = require('./utils');


exports.getPLACEHOLDER = async (req, res) => {
	// const queryStr = 'SELECT * FROM categories';
	// const transactions = await db.query(queryStr);
	// res.send(transactions);
};

exports.postPLACEHOLDER = async (req, res) => {
	// const params = [req.body.target, req.body.title];
	// const queryStr = 'INSERT INTO categories (target, title) VALUES (?, ?)';
	// const user = await db.query(queryStr, params);
	// res.sendStatus(201);
};