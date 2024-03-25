import express from 'express';
import bodyParser from 'body-parser';
import groceriesController from './src/controllers/groceries.controller';
import ordersController from './src/controllers/orders.controller';
import usersController from './src/controllers/users.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/groceries', groceriesController);
app.use('/orders', ordersController);
app.use('/users', usersController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
