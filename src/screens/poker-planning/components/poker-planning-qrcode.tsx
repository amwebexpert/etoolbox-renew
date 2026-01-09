import { QrcodeOutlined } from "@ant-design/icons";
import { isBlank } from "@lichens-innovation/ts-common";
import { Card, Spin, Typography } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";

import { usePokerPlanningStore } from "../poker-planning.store";
import { buildFullRouteURL, generateQRCodeDataUrl } from "../poker-planning.utils";

export const PokerPlanningQRCode = () => {
  const { styles } = useStyles();
  const { hostName, roomName, roomUUID } = usePokerPlanningStore();

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSessionActive = !isBlank(roomUUID);

  useEffect(() => {
    if (!isSessionActive) {
      setQrCodeDataUrl(null);
      return;
    }

    const generateQRCode = async () => {
      setIsLoading(true);
      try {
        const url = buildFullRouteURL({ hostName, roomUUID, roomName });
        const dataUrl = await generateQRCodeDataUrl({ data: url, width: 200 });
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
        setQrCodeDataUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    generateQRCode();
  }, [hostName, roomName, roomUUID, isSessionActive]);

  if (!isSessionActive) {
    return null;
  }

  return (
    <Card
      className={styles.card}
      size="small"
      title={
        <span className={styles.title}>
          <QrcodeOutlined /> Room QR Code
        </span>
      }
    >
      <div className={styles.container}>
        {isLoading ? (
          <Spin size="large" />
        ) : qrCodeDataUrl ? (
          <>
            <img
              src={qrCodeDataUrl}
              alt="Room QR Code"
              className={styles.qrImage}
            />
            <Typography.Text type="secondary" className={styles.hint}>
              Scan to join the room
            </Typography.Text>
          </>
        ) : (
          <Typography.Text type="secondary">
            Failed to generate QR code
          </Typography.Text>
        )}
      </div>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  card: {
    width: "fit-content",
    minWidth: 240,
    alignSelf: "center",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 8,
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadius,
  },
  qrImage: {
    maxWidth: "100%",
    height: "auto",
    imageRendering: "pixelated",
    borderRadius: token.borderRadius,
  },
  hint: {
    fontSize: 12,
    textAlign: "center",
  },
}));
