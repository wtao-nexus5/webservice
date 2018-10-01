import kafka from 'kafka-node';
import express from 'express';
import bodyParser from 'body-parser';

const client = new kafka.Client('localhost:2181');

const options = {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
};
const producer = new kafka.HighLevelProducer(client, options);
producer.on('ready', function () {
    console.log('Kafka Producer is connected and ready.');
});

// For this demo we just log producer errors to the console.
producer.on('error', function (error) {
    console.error(error);
});

const KafkaService = {
    sendRecord: ({ data }, callback = () => { }) => {
        if (!userId) {
            return callback(new Error(`A userId must be provided.`));
        }

        const buffer = new Buffer.from(JSON.stringify(data));
        // Create a new payload
        const record = [
            {
                topic: 'echoing',
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];

        //Send record to Kafka and log result/error
        producer.send(record, callback);
    }
};

const app = express();
const port = 3031;
app.use(bodyParser.json());
app.listen(port, () => console.log(`caerostris is listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/inbound/:sourceId', (req, res) => {
    console.log(req.body);
    res.send('Hello World!')
});