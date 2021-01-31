import moment from 'moment';

// Validates datetime
const isValid = (datetime: any) => {
  if (!moment(datetime).isValid()) {
    throw RangeError('Invalid date');
  }

  return datetime;
};

// Converts datetime to moment in a fixed-offset timezone
const toParseZone = (datetime: any) => isValid(moment.parseZone(datetime));

// Returns "1 Jan 2019" - "31 Dec 2019"
export const getDayMonthYear = (datetime: any) => {
  const dt = toParseZone(datetime);
  return dt.format('D MMM YYYY');
};

// Returns "01/01/2019" - "12/31/2019"
export const getMonthDayYear = (datetime: any) => {
  const dt = toParseZone(datetime);
  return dt.format('MM/DD/YYYY');
};

export default getDayMonthYear;