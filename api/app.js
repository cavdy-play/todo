import express from 'express';
import bodyParser from 'body-parser';

// Import Routes
import authRoute from './routes/auth';
import todoRoute from './routes/todo';
import userRoute from './routes/user';

import jwtMiddleware from './middlewares/jwt';

const app = express();
const PORT = process.env.PORT || 8000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome To Todo'
  });
});
app.use('/api/auth', authRoute);
app.use('/api/todo', jwtMiddleware.checkToken, todoRoute);
app.use('/api/user', jwtMiddleware.checkToken, userRoute);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
