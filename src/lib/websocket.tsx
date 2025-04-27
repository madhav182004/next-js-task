'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  activeUsers: number;
  messages: Array<{
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    isOwn: boolean;
  }>;
  sendMessage: (text: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  activeUsers: 0,
  messages: [],
  sendMessage: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [messages, setMessages] = useState<WebSocketContextType['messages']>([]);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;
  const [userId] = useState(() => Math.random().toString(36).substring(7));

  const connect = () => {
    if (typeof window === 'undefined') return;

    const wsInstance = new WebSocket('ws://localhost:3001');

    wsInstance.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      setRetryCount(0);
    };

    wsInstance.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    wsInstance.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      
      if (retryCount < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
        console.log(`Attempting to reconnect in ${delay}ms...`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          connect();
        }, delay);
      }
    };

    wsInstance.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'activeUsers') {
          console.log('Active users updated:', data.count);
          setActiveUsers(data.count);
        } else {
          console.log('Message received:', data);
          setMessages((prev) => {
            if (prev.some((msg) => msg.id === data.id)) {
              return prev;
            }
            return [
              ...prev,
              {
                ...data,
                timestamp: new Date(data.timestamp),
                isOwn: data.sender === userId,
              },
            ];
          });
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    setWs(wsInstance);
  };

  useEffect(() => {
    connect();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = (text: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Sending message:', text);
      const message = {
        id: Date.now().toString(),
        text,
        sender: userId,
        isOwn: true,
      };
      ws.send(JSON.stringify(message));
      setMessages((prev) => [
        ...prev,
        {
          ...message,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        activeUsers,
        messages,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}; 