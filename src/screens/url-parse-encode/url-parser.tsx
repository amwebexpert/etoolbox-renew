import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

export const UrlParser = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Title level={4}>URL Parser</Title>
      <Paragraph type="secondary">
        Analysez et décomposez les URLs en leurs composants
      </Paragraph>
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    padding: 16,
  },
}));

