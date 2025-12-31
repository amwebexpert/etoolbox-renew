import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Divider, Modal, Space, Switch, Typography } from "antd";
import { createStyles } from "antd-style";
import { useSettingsStore } from "../../stores/settings.store";

const { Text, Title } = Typography;

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog = ({ open, onClose }: SettingsDialogProps) => {
  const { styles } = useStyles();
  const { themeMode, toggleThemeMode } = useSettingsStore();
  const isDarkMode = themeMode === "dark";

  return (
    <Modal
      title={
        <Title level={4} className={styles.title}>
          Settings
        </Title>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Divider className={styles.divider} />

      <Space direction="horizontal" className={styles.row}>
        <Space direction="horizontal" align="center">
          {isDarkMode ? (
            <MoonOutlined className={styles.icon} />
          ) : (
            <SunOutlined className={styles.icon} />
          )}
          <Text strong>Dark Mode</Text>
        </Space>

        <Switch
          checked={isDarkMode}
          onChange={toggleThemeMode}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </Space>

      <Text type="secondary" className={styles.hint}>
        Toggle between light and dark theme
      </Text>
    </Modal>
  );
};

const useStyles = createStyles(() => ({
  title: {
    margin: 0,
  },
  divider: {
    margin: "12px 0 24px",
  },
  row: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  hint: {
    display: "block",
    marginTop: 8,
    fontSize: 12,
  },
}));
