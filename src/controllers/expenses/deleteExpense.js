import expenses from '../../models/expenses.js';

const deleteExpense = async (req, res) => {
  const data = await expenses.delete(req.params.id);
  if (data == 0) {
    res.status(404).json({
      code: 404,
      status: 'error',
      message: 'Not Found',
    });
  } else {
    let response = {
      code: 200,
      status: 'success',
      data: data,
    }

    res.json(response);
  }
}
export default deleteExpense;
