import express from 'express';
import morgan from 'morgan';

import homeRouter from './routes/home.js';
import apiRouter from './routes/api.js';

const app = express();

// logging
app.use(morgan('tiny'))

// json body parser
app.use(express.json());

// urlencoded body parser
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'pug') // set the view engine to pug
app.set('views', './src/views') // set the views directory

// static files
app.use(express.static('./src/public'))

app.use("/", homeRouter)

app.use("/api", apiRouter)

export default app;
