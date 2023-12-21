import expenses from '../../models/expenses.js';

const getExpenses = async (req, res) => {
  const data = await expenses.findAll(req.query);
  let response = {
    code: 200,
    status: 'success',
    meta: data.meta,
    query: req.query,
    params: req.params,
    data: data.data,
  }

  res.json(response);

};

export default getExpenses;
