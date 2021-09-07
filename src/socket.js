import { messageReceived } from "./actions";
import { getClaims } from "./auth/token";
import env from "./env";
import { loadChats } from "./services/chat.service";
import { loadUsers } from "./services/user.service";
import { store } from "./store";

const ws = {
    socket: null,
    connect: () => {
        if ("WebSocket" in window) {
            const claims = getClaims();
            console.log(claims);
            // Let us open a web socket
            ws.socket = new WebSocket(`${env.WS_URL}/${claims.username}`);

            ws.socket.onopen = function () {
                // Web Socket is connected, send data using send()
                ws.socket.send("Message to send");
                loadUsers(store.dispatch);
                loadChats(store.dispatch);
            };

            ws.socket.onmessage = function (evt) {
                store.dispatch(messageReceived(JSON.parse(evt.data)));
            };

            ws.socket.onclose = function () {

                // websocket is closed.
                console.log("Connection is closed...");
            };
        } else {

            // The browser doesn't support WebSocket
            alert("WebSocket NOT supported by your Browser!");
        }
    }
}

export default ws;