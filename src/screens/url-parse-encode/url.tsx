import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Tabs } from "antd";
import { createStyles } from "antd-style";

const TAB_ITEMS = [
  { key: "/url/encoder", label: "Encoder" },
  { key: "/url/curl", label: "cURL" },
  { key: "/url/parser", label: "Parser" },
];

export const Url = () => {
  const { styles } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Tabs
        activeKey={location.pathname}
        items={TAB_ITEMS}
        onChange={(to: string) => navigate({ to })}
        className={styles.tabs}
      />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  tabs: {
    marginBottom: 0,
    "& .ant-tabs-nav": {
      marginBottom: 0,
    },
  },
  content: {
    flex: 1,
    borderTop: `1px solid ${token.colorBorderSecondary}`,
  },
}));
