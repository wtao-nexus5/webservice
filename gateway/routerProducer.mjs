import { KafkaProducer } from './kafkaConnector';
import express from 'express';

export const routerProducer = express.Router();
const producer = new KafkaProducer();

routerProducer.post('/inbound/:sourceId', (req, res) => {
    let logEntry = {
        event: 'Producer',
        from: req.originalUrl,
        ip: req.ip,
        sourceId: req.params.sourceId,
        body: req.body
    };
    console.log(JSON.stringify(logEntry));
    producer.sendRecord(req.body);
    res.sendStatus(200)
});