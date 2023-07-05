import { useEffect, useRef } from 'react';

import { CONFIG } from '@config';

interface useEmergencySocketProps {
  callback?: Function;
}

const SOCKET_BASE_URL = CONFIG.API_BASE_URL?.split('https://')[1];

const useEmergencySocket = ({ callback }: useEmergencySocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);

  // init
  useEffect(() => {
    if (!callback) return;
    socketRef.current = new WebSocket(`wss://${SOCKET_BASE_URL}/ws/work/`);

    // socketRef.current.onopen = () => {};

    socketRef.current.onmessage = async (event: any) => {
      const socketData = JSON.parse(event.data);
      callback && callback(socketData.data);
    };

    socketRef.current.onerror = (e: any) => {
      //
    };

    return () => {
      if (socketRef?.current) {
        socketRef.current.close();
      }
    };
  }, [callback]);
};

export { useEmergencySocket };
