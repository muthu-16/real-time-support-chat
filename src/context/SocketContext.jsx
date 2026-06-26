import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext.jsx';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      socketRef.current = io(import.meta.env.VITE_API_URL || '/', {
        transports: ['websocket'],
        withCredentials: true,
        query: { userId: user.id },
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connect error', error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  return <SocketContext.Provider value={{ socket: socketRef.current }}>{children}</SocketContext.Provider>;
};
