import { getExpenses } from './index.js';
import moment from 'moment';

function parseTimeString(timeString) {
  let startDate = moment();
  let endDate = moment();

  switch (true) {
    case timeString.includes('day'):
      const dayDuration = parseInt(timeString.split(' ')[0]);
      startDate = moment().subtract(dayDuration, 'weeks');
      endDate = moment(startDate).endOf('day');
      break;
    case timeString.includes('week'):
      const weekDuration = parseInt(timeString.split(' ')[0]);
      startDate = moment().subtract(weekDuration, 'weeks');
      endDate = moment(startDate).endOf('week');
      break;
    case timeString.includes('month'):
      const monthDuration = parseInt(timeString.split(' ')[0]);
      startDate = moment().subtract(monthDuration, 'months');
      endDate = moment(startDate).endOf('month');
      break;
    case timeString.includes('year'):
      const yearDuration = parseInt(timeString.split(' ')[0]);
      startDate = moment().subtract(yearDuration, 'years');
      endDate = moment(startDate).endOf('year');
      break;
    case moment(timeString, 'YYYY').isValid():
      startDate = moment(timeString, 'YYYY');
      endDate = moment(startDate).endOf('year');
      break;
    case moment(timeString, 'MMMM YYYY').isValid():
      startDate = moment(timeString, 'MMMM YYYY');
      endDate = moment(startDate).endOf('month');
      break;
    case moment(timeString, 'YYYY MMMM').isValid():
      startDate = moment(timeString, 'YYYY MMMM');
      endDate = moment(startDate).endOf('month');
      break;
    default:
      return 400;
  }

  return { startDate, endDate };
}

const getExpensesPeriod = async (req, res) => {

  const timeFrame = parseTimeString(req.params.period);

  if (timeFrame === 400) {
    res.status(400).json({
      code: 400,
      status: 'error',
      message: 'Invalid time frame',
      examples: [
        '1 day',
        '1 week',
        '1 month',
        '3 months',
        '1 year',
        '2020',
        'January 2020',
        '2020 January',
        'February 2020',
        '2020 February',
      ]
    });
  } else {
    req.query.dateFrom = timeFrame.startDate.format('YYYY-MM-DD');
    req.query.dateTo = timeFrame.endDate.format('YYYY-MM-DD');

    return getExpenses(req, res)
  }
};

export default getExpensesPeriod;
