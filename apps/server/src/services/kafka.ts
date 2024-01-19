import { Kafka, Producer } from "kafkajs";
// import fs from "fs";
// import path from "path";


const kafka = new Kafka({
  brokers: ["rw.kfc05ufvfndt261c9fdc.at.double.cloud:9091"],
  //   ssl: {
  //     ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  //   },
  sasl: {
    username: "admin",
    password: "7K0uQwXRcJxgYp0g",
    mechanism: "plain",
  },
});

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: string) {
  const producer = await createProducer();
  await producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "MESSAGES",
  });
  return true;
}


export default kafka;