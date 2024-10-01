const express = require('express');

const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middlewares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middleware - between request and response
app.use(express.json());

// use static files from a file
app.use(express.static(`${__dirname}/public`));

// writing ouur own middleware
app.use((req, res, next) => {
  console.log('middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// app.get('/', (req, res) => {
//     // res.status(200).send("hi fro server");
//     res.status(200).json({message : "hi fro server"});

// });

//app.post()

// JSON.parse converts JSON into an array of js object

// routing

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// // req has all the data sent by the USER
// app.post("/api/v1/tours", createTour);

// app.patch('/api/v1/tours/:id', updateTour)

// app.delete('/api/v1/tours/:id', deleteTour)

// use it as a middleware

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
