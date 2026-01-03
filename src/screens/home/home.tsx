import {
  BgColorsOutlined,
  BulbOutlined,
  CalendarOutlined,
  CodeOutlined,
  FileTextOutlined,
  GithubOutlined,
  LinkOutlined,
  LockOutlined,
  NumberOutlined,
  PictureOutlined,
  QrcodeOutlined,
  TableOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Card, Col, Row, Typography } from "antd";
import { createStyles } from "antd-style";
import { ScreenContainer } from "~/components/ui/screen-container";

const { Title, Paragraph, Text } = Typography;

const features = [
  { icon: <LinkOutlined />, name: "URL Tools", description: "Parse, encode & cURL converter", color: "#1890ff", path: "/url" },
  { icon: <CodeOutlined />, name: "JSON Suite", description: "Format, convert & repair JSON", color: "#52c41a", path: "/json" },
  { icon: <FileTextOutlined />, name: "Base64", description: "Encode & decode text/images", color: "#722ed1", path: "/base64" },
  { icon: <BgColorsOutlined />, name: "Colors", description: "Picker & named color explorer", color: "#eb2f96", path: "/colors" },
  { icon: <ThunderboltOutlined />, name: "RegEx Tester", description: "Test patterns in real-time", color: "#fa8c16", path: "/regex-tester" },
  { icon: <NumberOutlined />, name: "UUID Generator", description: "Generate unique identifiers", color: "#13c2c2", path: "/uuid-generator" },
  { icon: <LockOutlined />, name: "JWT Decoder", description: "Decode & inspect tokens", color: "#f5222d", path: "/jwt-decoder" },
  { icon: <QrcodeOutlined />, name: "QR Code", description: "Generate QR codes instantly", color: "#2f54eb", path: "/qrcode-generator" },
  { icon: <PictureOutlined />, name: "Image OCR", description: "Extract text from images", color: "#a0d911", path: "/image-ocr" },
  { icon: <CalendarOutlined />, name: "Date Converter", description: "Epoch & date formats", color: "#faad14", path: "/date-converter" },
  { icon: <TableOutlined />, name: "CSV Parser", description: "Parse & visualize CSV data", color: "#1890ff", path: "/csv-parser" },
  { icon: <TeamOutlined />, name: "Poker Planning", description: "Agile estimation tool", color: "#eb2f96", path: "/poker-planning" },
  { icon: <UnorderedListOutlined />, name: "References", description: "MIME types & HTML entities", color: "#52c41a", path: "/common-lists" },
  { icon: <GithubOutlined />, name: "GitHub Search", description: "Explore user repositories", color: "#722ed1", path: "/github-user-projects" },
];

export const Home = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      {/* Hero Section */}
      <div className={styles.hero}>
        <Title level={1} className={styles.heroTitle}>
          Web Toolbox
        </Title>
        <Paragraph className={styles.heroSubtitle}>A Swiss Army knife for web developers</Paragraph>
      </div>

      {/* Features Grid */}
      <section className={styles.section}>
        <Title level={2} className={styles.sectionTitle}>
          <BulbOutlined className={styles.sectionIcon} /> Available Tools
        </Title>

        <Row gutter={[16, 16]}>
          {features.map((feature) => (
            <Col xs={12} sm={8} md={6} lg={4} key={feature.name}>
              <Card
                hoverable
                className={styles.featureCard}
                styles={{ body: { padding: 16, textAlign: "center" } }}
                onClick={() => navigate({ to: feature.path })}
              >
                <div className={styles.featureIcon} style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <Text strong className={styles.featureName}>
                  {feature.name}
                </Text>
                <Text type="secondary" className={styles.featureDesc}>
                  {feature.description}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  hero: {
    textAlign: "center",
    margin: 12,
  },
  heroTitle: {
    marginBottom: "4px !important",
    color: `${token.colorPrimary} !important`,
  },
  heroSubtitle: {
    color: `${token.colorTextSecondary} !important`,
    marginBottom: "0 !important",
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "24px !important",
  },
  sectionIcon: {
    color: token.colorPrimary,
    fontSize: 24,
  },
  featureCard: {
    height: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: token.boxShadowSecondary,
    },
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureName: {
    display: "block",
    fontSize: 13,
    marginBottom: 4,
  },
  featureDesc: {
    display: "block",
    fontSize: 11,
    lineHeight: 1.3,
  },
}));
