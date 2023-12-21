import { Router } from 'express';
import { getExpenses, getExpense, createExpense, deleteExpense, updateExpense, getExpensesLast, generateExpense } from '../controllers/expenses/index.js';

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
})

router.get('/expenses', getExpenses);
router.get('/expenses/last/:period', getExpensesLast);
router.get('/expenses/generate', generateExpense);
router.get('/expenses/:id', getExpense);
router.post('/expenses', createExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;
