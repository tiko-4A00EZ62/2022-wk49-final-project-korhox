import expenses from '../../models/expenses.js';

const updateExpense = async (req, res) => {
  const data = await expenses.update(req.params.id, req.body);

  if (data == "0") {
    let response = {
      code: 404,
      status: 'error',
      message: 'Expense not found'
    }

    res.status(404).json(response);
    return;
  } else {
    let response = {
      code: 200,
      status: 'success',
      data: data,
    }
    res.json(response);
  }
}

export default updateExpense
