import { routerProducer } from './routerProducer';
import { routerConsumer } from './routerConsumer';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3031;
app.listen(port, () => console.log(`express.js is listening on port ${port}!`));

app.use(bodyParser.json(), routerProducer, routerConsumer);

app.get('/', (req, res) => res.send('Hello World!'));