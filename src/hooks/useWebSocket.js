import { useState, useEffect, useRef, useCallback } from 'react';

export const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState(null);
    const socketRef = useRef(null);

    const connect = useCallback(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            setIsConnected(true);
        };
        socketRef.current.onmessage = (event) => {
            setMessage(event.data);
        };
        socketRef.current.onclose = () => {
            setIsConnected(false);
        };
        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        setSocket(socketRef.current);
    }, [url]);

    const sendMessage = useCallback((msg) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(msg);
        } else {
            console.warn('WebSocket is not open. Unable to send message.');
        }
    }, []);

   

    useEffect(() => {
        connect();
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connect]);
    return { socket, isConnected, message, sendMessage };
};

