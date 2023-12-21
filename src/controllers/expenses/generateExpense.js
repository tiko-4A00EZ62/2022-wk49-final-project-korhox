import expenses from '../../models/expenses.js';
import { faker } from '@faker-js/faker';
import moment from 'moment';

const generateExpense = async (req, res) => {
  const dateTo = moment().toDate();
  const dataFrom = moment().subtract(1, 'year').toDate();

  console.log(dataFrom, dateTo)

  let inserts = [];

  const count = req.query.count || 1;

  for (let i = 0; i < count; i++) {
    inserts.push({
      recipient: faker.company.name(),
      description: faker.finance.transactionDescription(),
      amount: faker.finance.amount({ min: 0.01, max: 1000 }),
      date: faker.date.between({ from: dataFrom, to: dateTo }),
      category: faker.commerce.department(),
    });
  }

  const data = await expenses.insert(inserts);
  let response = {
    code: 200,
    status: 'success',
    data: data,
    inserted_values: inserts,
  }

  res.json(response);
}

export default generateExpense
