import type { ReactNode } from "react";
import { createStyles } from "antd-style";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

export const ScreenContainer = ({ children, className }: ScreenContainerProps) => {
  const { styles, cx } = useStyles();

  return <div className={cx(styles.container, className)}>{children}</div>;
};

const useStyles = createStyles(() => ({
  container: {
    padding: "16px 16px 48px",
    maxWidth: 1200,
    margin: "0 auto",
  },
}));

