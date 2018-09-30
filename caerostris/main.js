const express = require('express')

const app = express();
const port = 3031;

app.listen(port, () => console.log(`caerostris is listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));