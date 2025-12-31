import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { createStyles } from "antd-style";

const { Header } = Layout;

interface AppHeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
}

export const AppHeader = ({ onMenuClick, onSettingsClick }: AppHeaderProps) => {
  const { styles } = useStyles();

  return (
    <Header className={styles.header}>
      <Button
        type="text"
        icon={<MenuOutlined className={styles.icon} />}
        onClick={onMenuClick}
        className={styles.button}
        aria-label="Toggle menu"
      />

      <div className={styles.titleContainer}>
        <img src="/icon.png" alt="eToolbox" className={styles.logo} />
        <span className={styles.title}>Web Toolbox</span>
      </div>

      <div className={styles.spacer} />

      <Button
        type="text"
        icon={<SettingOutlined className={styles.icon} />}
        onClick={onSettingsClick}
        className={styles.settingsButton}
        aria-label="Settings"
      />
    </Header>
  );
};

const useStyles = createStyles(({ token }) => ({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    background: token.colorPrimary,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  button: {
    marginRight: 16,
    width: 48,
    height: 48,
  },
  settingsButton: {
    width: 48,
    height: 48,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
  logo: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#fff",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  spacer: {
    flex: 1,
  },
}));
