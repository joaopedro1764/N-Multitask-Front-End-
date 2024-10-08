import { useEffect, useRef, useCallback } from 'react';

export const useWebSocketPingPong = (sendMessage, pingInterval = 6000) => {

    const pingTimeoutRef = useRef(null);

    const sendPing = useCallback(() => {
        if (sendMessage) {
            const messagePing = JSON.stringify({ type: 'crm_request', action: "ping" })
            sendMessage(messagePing)
            pingTimeoutRef.current = setTimeout(sendPing, pingInterval);
        }
    }, [sendMessage, pingInterval]);

    useEffect(() => {
        sendPing();
        return () => {
            if (pingTimeoutRef.current) {
                clearTimeout(pingTimeoutRef.current);
            }
        };
    }, [sendPing]);

    return null;
};

