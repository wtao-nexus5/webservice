cd kafka_2.11-2.0.0

# start zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# on zookeeper success, start Kafka server
bin/kafka-server-start.sh config/server.properties

# stop Kafka server
bin/kafka-server-stop.sh

# create a topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic <topic-name>
bin/kafka-topics.sh --list --zookeeper localhost:2181

# producer
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic <topic-name>

# consumer
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic <topic-name> --from-beginning