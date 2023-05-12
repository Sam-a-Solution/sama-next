import { useEffect, useRef } from 'react';

interface useEmergencySocketProps {
  callback?: Function;
}

const useEmergencySocket = ({ callback }: useEmergencySocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);

  // init
  useEffect(() => {
    if (!callback) return;
    socketRef.current = new WebSocket(
      `wss://api.dev.ismart-safety.com/ws/work/`,
    );
    socketRef.current.onopen = () => {
      console.log('웹 소켓 연결 성공: ', socketRef.current);
    };

    socketRef.current.onmessage = async (event: any) => {
      const socketData = JSON.parse(event.data);
      console.log('비상상황 시작', socketData);

      callback && callback(socketData.data);
    };

    socketRef.current.onerror = (e: any) => {
      console.log('웹 소켓 에러: ', e);
    };

    return () => {
      if (socketRef?.current) {
        socketRef.current.close();
      }
    };
  }, [callback]);
};

export { useEmergencySocket };
