import { KafkaConsumer } from './kafkaConnector';
import express from 'express';
import http from 'http'
import Server from 'socket.io'

const io = Server(http.Server(express()));
const port = 3032;
console.log(`websocket is listening on port ${port}!`)
io.listen(port);

io.on('connection', (socket) => {
    let address = socket.handshake.address;
    console.log(`Connected: remote socket ${address}`);
    socket.on('disconnect', () => {
        console.log(`Disconnected: remote socket ${address}`);
    });
});

const consumer = new KafkaConsumer((decodedMessage) => io.emit('kafka', decodedMessage));

export const routerConsumer = express.Router();
routerConsumer.get('/outbound/:sourceId', (req, res) => {
    producer.sendStatus(req.body, () => res.status(200));
});

