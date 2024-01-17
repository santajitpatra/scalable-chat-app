import { Server } from "socket.io";
import Redis from "ioredis";
import prismaClient from "./prisma";

const pub = new Redis({
  host: "redis-2588ee30-anawalls-c6c0.a.aivencloud.com",
  port: 14515,
  username: "default",
  password: "AVNS_E370XkER7xzm3XYpKa8",
});

const sub = new Redis({
  host: "redis-2588ee30-anawalls-c6c0.a.aivencloud.com",
  port: 14515,
  username: "default",
  password: "AVNS_E370XkER7xzm3XYpKa8",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");

    // this is the socket.io event listener
    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Rec.", message);
        // publish this message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    // this is the redis event listener
    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);

        // save the message to the database
        await prismaClient.message.create({
          data: {
            text: message,
          },
        });
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
