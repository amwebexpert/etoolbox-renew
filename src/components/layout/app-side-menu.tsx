import {
  HomeOutlined,
  InfoCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { createStyles } from "antd-style";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "/url",
    icon: <LinkOutlined />,
    label: <Link to="/url">URL Parser</Link>,
  },
  {
    key: "/about",
    icon: <InfoCircleOutlined />,
    label: <Link to="/about">About</Link>,
  },
];

interface AppSideMenuProps {
  selectedKeys: string[];
  onClick?: () => void;
}

export const AppSideMenu = ({ selectedKeys, onClick }: AppSideMenuProps) => {
  const { styles } = useStyles();

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      items={menuItems}
      onClick={onClick}
      className={styles.menu}
    />
  );
};

const useStyles = createStyles(() => ({
  menu: {
    height: "100%",
    borderRight: 0,
    background: "transparent",
    padding: "0 !important",
    ".ant-menu-item": {
      borderRadius: "0 !important",
      margin: "0 !important",
      marginInline: "0 !important",
      width: "100% !important",
      paddingLeft: "24px !important",
    },
    ".ant-menu-item-selected": {
      borderRadius: "0 !important",
      margin: "0 !important",
      marginInline: "0 !important",
    },
  },
}));
