import WebSocket, {WebSocketServer} from "ws"
import { message, messageTypes } from "./types/messages";

const wss = new WebSocketServer({port : 8080});

wss.on("connection",function connection(ws){
    ws.on("error",console.error);

    ws.on("message",function message(data){
        const message : message = JSON.parse(data.toString());
        console.log(message);
        if(message.type === messageTypes.MOVEMENT){
            console.log(message.move);
            wss.clients.forEach(function each(client){
                if(client !== ws && client.readyState===WebSocket.OPEN){
                    client.send(JSON.stringify(message));
                }
            })
        }
    });
});



