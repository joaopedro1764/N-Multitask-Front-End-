import React, { createContext, useContext } from 'react';
import { useWebSocket } from './useWebSocket';


const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const ws = useWebSocket('wss://nmt.nmultifibra.com.br/notion/ws');

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
