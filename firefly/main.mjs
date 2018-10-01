import kafka from 'kafka-node'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import Server from 'socket.io'

const client = new kafka.Client('localhost:2181');

const topics = [
    {
        topic: 'echoing'
    }
];
const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'buffer'
};
const consumer = new kafka.HighLevelConsumer(client, topics, options);

consumer.on('message', function (message) {
    // Read string into a buffer.
    var buf = new Buffer(message.value, 'binary');
    //var decodedMessage = JSON.parse(buf.toString());
    var decodedMessage = buf.toString();
    console.log(decodedMessage);
});

consumer.on('error', function (err) {
    console.log('error', err);
});

const app = express();
const io = Server(http.Server(app));
const port = 3032;

app.use(bodyParser.json());

app.listen(port, () => console.log(`firefly is listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', (socket) => {
    console.log('a user connected');
});

