import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

export const UrlEncoder = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Title level={4}>URL Encoder</Title>
      <Paragraph type="secondary">
        Encodez et décodez les URLs
      </Paragraph>
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    padding: 16,
  },
}));

