import { WebSocket } from 'react-native';

class WebSocketManager {
  constructor(url) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket connection opened');
    };
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  close() {
    this.ws.close();
  }
}

export default WebSocketManager;
