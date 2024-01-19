import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [],
});

export async function createProducer() {
    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

async function produceMessage(key: string, message: string) {

}

export default kafka;