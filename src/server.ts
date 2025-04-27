import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocketServer({ server });

let activeUsers = 0;

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');
  activeUsers++;
  broadcastActiveUsers();

  ws.on('message', (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received message:', message);
      
      wss.clients.forEach((client: WebSocket) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            ...message,
            isOwn: false,
            timestamp: new Date().toISOString(),
          }));
        }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    activeUsers--;
    broadcastActiveUsers();
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

function broadcastActiveUsers() {
  const message = JSON.stringify({
    type: 'activeUsers',
    count: activeUsers,
  });

  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
}); 