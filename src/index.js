import 'dotenv/config'
import app from './app.js';

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.info(`Expense Tracker Backend is now listening on port ${PORT}`);
});

