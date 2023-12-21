import { test, expect, describe } from "bun:test";
import app from "../../src/app";

describe('Expense API', () => {
  it('should retrieve a list of expenses', async () => {
    const response = await request(app).get('/expenses');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should add a new expense', async () => {
    const newExpense = {
      date: '2022-01-01',
      amount: 10.99,
      shop: 'Example Shop',
      category: 'Food',
    };

    const response = await request(app).post('/expenses').send(newExpense);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Add more test cases for other endpoints
});
