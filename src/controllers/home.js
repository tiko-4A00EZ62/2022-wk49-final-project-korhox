import { getExpenses } from "./expenses/index.js";

const getHome = async (req, res) => {
  res.render('home', { title: 'Home' });
}

export { getHome };
