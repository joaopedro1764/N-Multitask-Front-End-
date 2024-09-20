import React, { createContext, useContext } from 'react';
import { useWebSocket } from './useWebSocket';
import { URL } from '../utils/url';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const ws = useWebSocket(URL);

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
