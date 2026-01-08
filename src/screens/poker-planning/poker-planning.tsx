import { NumberOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { useParams } from "@tanstack/react-router";
import { Divider, Flex, Modal } from "antd";
import { createStyles } from "antd-style";
import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { PokerPlanningCards } from "./poker-planning-cards";
import { PokerPlanningOptions } from "./poker-planning-options";
import { PokerPlanningQRCode } from "./poker-planning-qrcode";
import { usePokerPlanningStore } from "./poker-planning.store";
import { PokerPlanningTable } from "./poker-planning-table";
import { PokerPlanningToolbar } from "./poker-planning-toolbar";
import {
  buildRemoveUserMessage,
  buildResetMessage,
  buildVoteMessage,
  parseEstimates,
} from "./poker-planning.utils";
import { usePokerSocket } from "./use-poker-socket";

interface PokerPlanningRouteParams {
  hostName?: string;
  roomUUID?: string;
  roomName?: string;
}

export const PokerPlanning = () => {
  const { styles } = useStyles();
  const [modal, contextHolder] = Modal.useModal();

  // Get URL params (will be undefined if accessing the base route without params)
  const routeParams = useParams({ strict: false }) as PokerPlanningRouteParams;

  const {
    hostName,
    roomName,
    roomUUID,
    username,
    socketState,
    myEstimate,
    session,
    setHostName,
    setRoomName,
    setRoomUUID,
    setMyEstimate,
    setIsEstimatesVisible,
    resetSession,
  } = usePokerPlanningStore();

  // Parse URL params on mount and populate the store
  useEffect(() => {
    const paramHostName = routeParams.hostName;
    const paramRoomUUID = routeParams.roomUUID;
    const paramRoomName = routeParams.roomName;

    if (isNotBlank(paramHostName) && isNotBlank(paramRoomUUID) && isNotBlank(paramRoomName)) {
      setHostName(paramHostName);
      setRoomUUID(paramRoomUUID);
      setRoomName(decodeURIComponent(paramRoomName));
    }
  }, [routeParams.hostName, routeParams.roomUUID, routeParams.roomName, setHostName, setRoomName, setRoomUUID]);

  const { isConnected, isConnecting, connect, disconnect, sendMessage } = usePokerSocket({
    hostName,
    roomUUID,
  });

  const estimates = session?.estimates ?? [];
  const { isEstimatesCleared, isUserMemberOfRoom } = parseEstimates({
    estimates,
    username,
  });

  const isSessionActive = isConnected && isNotBlank(roomUUID);
  const canVote = isSessionActive && isNotBlank(username) && isUserMemberOfRoom;

  const title = isNotBlank(roomName)
    ? `Poker Planning - ${roomName}`
    : "Poker Planning";

  // Sync my estimate with server session
  useEffect(() => {
    if (!session || isBlank(username)) return;

    const mySessionEstimate = session.estimates.find((e) => e.username === username);
    if (mySessionEstimate) {
      setMyEstimate(mySessionEstimate.estimate);
    }
  }, [session, username, setMyEstimate]);

  // Handle estimates cleared event
  useEffect(() => {
    if (isEstimatesCleared) {
      setIsEstimatesVisible(false);
      setMyEstimate(undefined);
    }
  }, [isEstimatesCleared, setIsEstimatesVisible, setMyEstimate]);

  const handleCreateRoom = useCallback(() => {
    if (isBlank(hostName) || isBlank(roomName)) return;

    // Generate new room UUID and connect
    const newRoomUUID = uuidv4();
    setRoomUUID(newRoomUUID);
  }, [hostName, roomName, setRoomUUID]);

  // Connect when roomUUID changes
  useEffect(() => {
    if (isNotBlank(roomUUID) && isNotBlank(hostName) && !isConnected && !isConnecting) {
      connect();
    }
  }, [roomUUID, hostName, isConnected, isConnecting, connect]);

  const handleJoinRoom = useCallback(() => {
    if (isBlank(username)) return;
    sendMessage(buildVoteMessage(username));
  }, [username, sendMessage]);

  const handleVote = useCallback(
    (value: string) => {
      if (value !== myEstimate) {
        setMyEstimate(value);
        sendMessage(buildVoteMessage(username, value));
      } else {
        // User is un-voting
        setMyEstimate(undefined);
        sendMessage(buildVoteMessage(username));
      }
    },
    [myEstimate, username, sendMessage, setMyEstimate]
  );

  const handleClearVotes = useCallback(() => {
    modal.confirm({
      title: "Clear All Votes",
      content: "Are you sure you want to clear all votes? This action cannot be undone.",
      okText: "Clear",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: () => {
        sendMessage(buildResetMessage());
      },
    });
  }, [modal, sendMessage]);

  const handleRemoveUser = useCallback(
    (userToRemove: string) => {
      modal.confirm({
        title: "Remove User",
        content: `Are you sure you want to remove "${userToRemove}" from the room?`,
        okText: "Remove",
        okButtonProps: { danger: true },
        cancelText: "Cancel",
        onOk: () => {
          sendMessage(buildRemoveUserMessage(userToRemove));
        },
      });
    },
    [modal, sendMessage]
  );

  const handleToggleVisibility = useCallback(() => {
    const { isEstimatesVisible } = usePokerPlanningStore.getState();
    setIsEstimatesVisible(!isEstimatesVisible);
  }, [setIsEstimatesVisible]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    resetSession();
  }, [disconnect, resetSession]);

  return (
    <ScreenContainer>
      {contextHolder}
      <Flex vertical gap="middle" className={styles.container}>
        <ScreenHeader
          icon={<NumberOutlined />}
          title={title}
          description="Real-time collaborative story point estimation for agile teams"
        />

        <PokerPlanningOptions
          socketState={socketState}
          isSessionActive={isSessionActive}
        />

        <PokerPlanningToolbar
          isConnected={isConnected}
          isConnecting={isConnecting}
          isUserMemberOfRoom={isUserMemberOfRoom}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          onClearVotes={handleClearVotes}
          onDisconnect={handleDisconnect}
        />

        <Divider className={styles.divider} />

        <PokerPlanningCards isDisabled={!canVote} onVote={handleVote} />

        <Divider className={styles.divider} />

        <PokerPlanningTable
          isUserMemberOfRoom={isUserMemberOfRoom}
          onRemoveUser={handleRemoveUser}
          onToggleVisibility={handleToggleVisibility}
        />

        <PokerPlanningQRCode />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
  divider: {
    margin: "8px 0",
  },
}));
