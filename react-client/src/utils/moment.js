import moment from 'moment';

export default (time) => {
	let makeDate = moment(time).format('M/DD');
  return makeDate;
};