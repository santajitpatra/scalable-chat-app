import { Server } from "socket.io";
// import * as Redis from "ioredis";
import Redis from "ioredis";


const pub = new Redis({
  host: "redis-30fc818e-anawalls-c6c0.a.aivencloud.com",
  port: 14515,
  username: "default",
  password: "AVNS_SoMFbuoeIRJGSx81JQv",
});

const sub = new Redis({
  host: "redis-30fc818e-anawalls-c6c0.a.aivencloud.com",
  port: 14515,
  username: "default",
  password: "AVNS_SoMFbuoeIRJGSx81JQv",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    pub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Rec.", message);

        // publish this message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    // sub.on("message", (channel, message) => {
    //   if (channel === "MESSAGES") {
    //     io.emit("message", message);
    //   }
    // });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
