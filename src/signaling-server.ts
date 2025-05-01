import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });
const clients: Map<string, WebSocket> = new Map();

wss.on('connection', (ws: WebSocket) => {
  let id: string;

  ws.on('message', (message: string) => {
    const data = JSON.parse(message);

    if (data.type === 'register') {
      id = data.id;
      clients.set(id, ws);
      console.log(`Registered client: ${id}`);
    }

    if (data.type === 'signal' && data.to && clients.has(data.to)) {
      clients.get(data.to)?.send(JSON.stringify({
        from: id,
        signal: data.signal
      }));
      console.log(`Sent signal to: ${data.to}`);
    }
  });

  ws.on('close', () => {
    if (id) {
      clients.delete(id);
      console.log(`Client disconnected: ${id}`);
    }
  });
});

console.log('Signaling server started on ws://localhost:8080');
