import expenses from '../../models/expenses.js';

const createExpense = async (req, res) => {
  const insert = {
    recipient: req.body.recipient || req.query.recipient || "Undefined",
    description: req.body.description || req.query.description || null,
    amount: req.body.amount || req.query.amount || 0,
    date: req.body.date || req.query.date || null,
    category: req.body.category || req.query.category || null,
  }
  const data = await expenses.insert(insert);
  let response = {
    code: 200,
    status: 'success',
    data: data,
  }

  res.json(response);
}

export default createExpense
