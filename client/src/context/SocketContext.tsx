import React, { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketContextProps,
  usersProps,
} from "../types";

export const SocketContext = createContext<SocketContextProps | null>(null);

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentUser: usersProps = useSelector(currentUserSelector);
  const [currentUsersOnline, setCurrentUsersOnline] = useState<[]>([]);

  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  useEffect(() => {
    if (currentUser._id != "") {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        "http://localhost:5000",
        {
          query: {
            userId: currentUser._id,
          },
        }
      );
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setCurrentUsersOnline(users);
      });
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [currentUser]);
  return (
    <SocketContext.Provider value={{ socket, currentUsersOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
