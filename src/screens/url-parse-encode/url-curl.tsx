import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

export const UrlCurl = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Title level={4}>cURL Builder</Title>
      <Paragraph type="secondary">Construisez et analysez des commandes cURL</Paragraph>
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    padding: 16,
  },
}));
