import { useCallback, useEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

import { usePokerPlanningStore } from "./poker-planning.store";
import type { PokerPlanningSession, SocketState, UserMessage } from "./poker-planning.types";
import { createSocket } from "./poker-planning.utils";

interface UsePokerSocketParams {
  hostName: string;
  roomUUID: string;
}

export const usePokerSocket = ({ hostName, roomUUID }: UsePokerSocketParams) => {
  const socketRef = useRef<ReconnectingWebSocket | null>(null);
  const postponedMessageRef = useRef<UserMessage | null>(null);

  const { setSocketState, setSession, socketState } = usePokerPlanningStore();

  const isConnected = socketState === "open";
  const isConnecting = socketState === "connecting";
  const canConnect = !!hostName && !!roomUUID;

  // Handle session update
  const handleSessionUpdate = useCallback(
    (session: PokerPlanningSession) => {
      setSession(session);
    },
    [setSession]
  );

  // Handle socket state update
  const handleSocketStateUpdate = useCallback(
    (state: SocketState) => {
      setSocketState(state);
    },
    [setSocketState]
  );

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!canConnect) return;

    socketRef.current = createSocket({
      hostName,
      roomUUID,
      onSessionUpdate: handleSessionUpdate,
      onSocketStateUpdate: handleSocketStateUpdate,
    });
  }, [canConnect, hostName, roomUUID, handleSessionUpdate, handleSocketStateUpdate]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setSocketState("closed");
      setSession(undefined);
    }
  }, [setSocketState, setSession]);

  // Send message through WebSocket
  const sendMessage = useCallback(
    (message: UserMessage) => {
      if (socketRef.current && isConnected) {
        socketRef.current.send(JSON.stringify(message));
      } else {
        postponedMessageRef.current = message;
      }
    },
    [isConnected]
  );

  // Send postponed messages when connection is established
  useEffect(() => {
    if (isConnected && postponedMessageRef.current && socketRef.current) {
      socketRef.current.send(JSON.stringify(postponedMessageRef.current));
      postponedMessageRef.current = null;
    }
  }, [isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    isConnected,
    isConnecting,
    canConnect,
    connect,
    disconnect,
    sendMessage,
  };
};

