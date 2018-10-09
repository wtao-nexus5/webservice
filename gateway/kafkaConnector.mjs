import kafka from 'kafka-node';

export var TopicName = 'echoing';

export class KafkaProducer {
    constructor() {
        this.producer = new kafka.HighLevelProducer(
            new kafka.Client('localhost:2181'),
            {
                sessionTimeout: 300,
                spinDelay: 100,
                retries: 2
            }
        );
        this.producer.on('ready', () => {
            console.log('Kafka Producer is connected and ready.');
        });
        this.producer.on('error', (err) => {
            console.log('Kafka Producer encounters an error, ' + err);
        });
        console.log('kafka producer created');
    }

    sendRecord(json) {
        const buffer = new Buffer.from(JSON.stringify(json));
        const record = [
            {
                topic: TopicName,
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];
        this.producer.send(record, (err, data) => {
            if (err) {
                let logEntry = {
                    event: 'Producer to kfka failed',
                    err: err,
                    data: data
                };
                console.log(JSON.stringify(logEntry));
            }
        });
    }
}

export class KafkaConsumer {
    constructor(onReceive = () => { }) {
        this.consumer = new kafka.HighLevelConsumer(
            new kafka.Client('localhost:2181'),
            [
                {
                    topic: TopicName
                }
            ],
            {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'buffer'
            }
        );
        this.consumer.on('message', (message) => {
            // Read string into a buffer.
            var buf = new Buffer(message.value, 'binary');
            var decodedMessage = buf.toString();
            let logEntry = {
                event: 'Consumer',
                msg: decodedMessage
            }
            console.log(JSON.stringify(logEntry));
            onReceive(decodedMessage);
        });
        this.consumer.on('error', (err) => {
            console.log('Kafka Consumer encounters an error, ' + err);
        });
        console.log('kafka consumer created');
    }
}
