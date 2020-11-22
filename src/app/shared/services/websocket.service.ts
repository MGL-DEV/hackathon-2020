import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class WebsocketService {
    ws: any;
    url: string;

    constructor() {
        this.url = "wss://sileo.mgldev.hu:8989"
        this.connect()
    }
    connect() {
        this.ws = new WebSocket(this.url, 'echo-protocol')
        let reconnectInterval = 1000
        this.ws.onopen = () => {
            reconnectInterval = 1000
            console.log("Websocket connected...")
        }

        this.ws.onmessage = (event: { data: object }) => {
            this.handleNotification(event.data)
        }

        this.ws.onclose = (event: { code: number; }) => {
            if (event) {
                if (event.code !== 1000) {
                    let maxReconnectInterval = 3000
                    setTimeout(() => {
                        if (reconnectInterval < maxReconnectInterval) {
                            reconnectInterval += 1000
                        }
                        this.ws = null;
                        console.log("Websocket reconnecting...")
                        this.connect()
                    }, reconnectInterval)
                }
            }
        }

        this.ws.onerror = (error: any) => {
            console.log(error)
            this.ws.close()
        }

        return true;
    }
    handleNotification(params: any) {
        let data = JSON.parse(params)
        console.log(data);
    }
    send(data: object) {
        console.log("send")
        if (this.ws.readyState != WebSocket.OPEN) {
            console.error("webSocket is not open: " + this.ws.readyState);
            return;
        }

        this.ws.send(JSON.stringify(data))
    }
    close() {
        this.ws.close()
    }

}
