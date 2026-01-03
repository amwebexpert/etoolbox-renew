import {
  ExperimentOutlined,
  GlobalOutlined,
  RocketOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Card, Col, Divider, Row, Table, Tag, Timeline, Typography } from "antd";
import { createStyles } from "antd-style";
import { ScreenContainer } from "~/components/ui/screen-container";
import { APP_VERSION_INFO } from "~/constants";

const { Title, Paragraph, Text } = Typography;


const versionData = [
  { key: "name", property: "Name", value: APP_VERSION_INFO.NAME },
  { key: "description", property: "Description", value: APP_VERSION_INFO.DESCRIPTION },
  { key: "version", property: "Version", value: APP_VERSION_INFO.VERSION },
  { key: "releaseDate", property: "Release Date", value: APP_VERSION_INFO.VERSION_DATE },
  { key: "author", property: "Author", value: APP_VERSION_INFO.AUTHOR },
  {
    key: "repository",
    property: "Repository",
    value: (
      <a href={APP_VERSION_INFO.REPOSITORY} target="_blank" rel="noopener noreferrer">
        {APP_VERSION_INFO.REPOSITORY}
      </a>
    ),
  },
];

const columns = [
  { title: "Property", dataIndex: "property", key: "property", width: 140 },
  { title: "Value", dataIndex: "value", key: "value" },
];

export const About = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <img src="/logo192.png" alt="Web Toolbox" className={styles.mainLogo} />
          </div>
          <Title level={1} className={styles.heroTitle}>
            Web Toolbox
          </Title>
          <Paragraph className={styles.heroSubtitle}>
            A Swiss Army knife for web developers
          </Paragraph>
          <div className={styles.heroTags}>
            <Tag color="blue" icon={<RocketOutlined />}>
              Open Source
            </Tag>
            <Tag color="green" icon={<GlobalOutlined />}>
              PWA Ready
            </Tag>
            <Tag color="purple" icon={<ExperimentOutlined />}>
              Always Evolving
            </Tag>
          </div>
        </div>
      </div>

      {/* Origin Story */}
      <section className={styles.section}>
        <Title level={2} className={styles.sectionTitle}>
          <TrophyOutlined className={styles.sectionIcon} /> The Story Behind
        </Title>
        <Card className={styles.storyCard}>
          <Timeline
            mode="alternate"
            items={[
              {
                color: "blue",
                content: (
                  <div>
                    <Tag color="blue" className={styles.timelineTag}>2020</Tag>
                    <Text strong>The Beginning — San Francisco</Text>
                    <Paragraph className={styles.timelineText}>
                      While working for a California-based company in San Francisco, a small tech challenge was launched
                      among developers. Each one had to demonstrate open source utility possibilities. This was the
                      spark that ignited Web Toolbox.
                    </Paragraph>
                  </div>
                ),
              },
              {
                color: "green",
                content: (
                  <div>
                    <Tag color="green" className={styles.timelineTag}>Early Days</Tag>
                    <Text strong>Humble Beginnings</Text>
                    <Paragraph className={styles.timelineText}>
                      It started with just one or two functions — simple utilities that scratched an itch. A Base64
                      encoder here, a URL parser there. Nothing fancy, but genuinely useful.
                    </Paragraph>
                  </div>
                ),
              },
              {
                color: "purple",
                content: (
                  <div>
                    <Tag color="purple" className={styles.timelineTag}>Growth</Tag>
                    <Text strong>Organic Evolution</Text>
                    <Paragraph className={styles.timelineText}>
                      Every time a need arose during web or mobile development — "I wish I had a quick tool for
                      this..." — it became a candidate for the toolbox. The collection grew naturally, driven by
                      real-world needs.
                    </Paragraph>
                  </div>
                ),
              },
              {
                color: "gold",
                content: (
                  <div>
                    <Tag color="gold" className={styles.timelineTag}>Today</Tag>
                    <Text strong>A Complete Developer Companion</Text>
                    <Paragraph className={styles.timelineText}>
                      Now with over 15 tools, Web Toolbox has become a go-to resource. And the
                      best part? It's still growing. The features aren't fixed — if it can be done in a web SPA, it
                      might just be the next addition!
                    </Paragraph>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </section>

      {/* Call to Action */}
      <section className={styles.section}>
        <Card className={styles.ctaCard}>
          <Row align="middle" gutter={24}>
            <Col xs={24} md={4} className={styles.ctaIconCol}>
              <RocketOutlined className={styles.ctaIcon} />
            </Col>
            <Col xs={24} md={20}>
              <Title level={3} className={styles.ctaTitle}>
                Have an Idea?
              </Title>
              <Paragraph className={styles.ctaText}>
                The toolbox is never finished! If you have a utility idea that could work as a web SPA feature, don't
                hesitate to suggest it. Whether it's a converter, generator, formatter, or something entirely new — if
                it helps developers, it might find its home here.
              </Paragraph>
              <Link to="/about">
                <Tag color="cyan" style={{ cursor: "pointer", fontSize: 14, padding: "4px 12px" }}>
                  Learn more about contributing →
                </Tag>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>

      <Divider />

      {/* Deployment Info */}
      <section className={styles.section}>
        <Title level={2} className={styles.sectionTitle}>
          <ExperimentOutlined className={styles.sectionIcon} /> Latest Deployment
        </Title>
        <Table columns={columns} dataSource={versionData} pagination={false} size="middle" bordered />
      </section>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  hero: {
    background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 50%, ${token.colorPrimaryBgHover} 100%)`,
    borderRadius: 16,
    padding: "48px 24px",
    marginBottom: 48,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at 20% 80%, ${token.colorPrimary}15 0%, transparent 50%),
                   radial-gradient(circle at 80% 20%, ${token.colorSuccess}15 0%, transparent 50%)`,
      pointerEvents: "none",
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
  },
  heroIcon: {
    marginBottom: 16,
  },
  mainLogo: {
    width: 96,
    height: 96,
    filter: `drop-shadow(0 4px 16px ${token.colorPrimary}50)`,
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3rem) !important",
    marginBottom: "8px !important",
    color: `${token.colorPrimary} !important`,
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.25rem) !important",
    color: `${token.colorTextSecondary} !important`,
    maxWidth: 600,
    margin: "0 auto 24px !important",
  },
  heroTags: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
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
  storyCard: {
    background: token.colorBgContainer,
    ".ant-timeline": {
      paddingTop: 16,
    },
    ".ant-timeline-item-label": {
      width: "80px !important",
      fontWeight: 600,
      color: token.colorPrimary,
    },
  },
  timelineText: {
    marginTop: 8,
    marginBottom: "0 !important",
    color: token.colorTextSecondary,
  },
  timelineTag: {
    marginBottom: 8,
    display: "inline-block",
  },
  ctaCard: {
    background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 100%)`,
    border: `1px solid ${token.colorPrimaryBorder}`,
  },
  ctaIconCol: {
    textAlign: "center",
    marginBottom: 16,
    "@media (min-width: 768px)": {
      marginBottom: 0,
    },
  },
  ctaIcon: {
    fontSize: 48,
    color: token.colorPrimary,
  },
  ctaTitle: {
    marginBottom: "8px !important",
  },
  ctaText: {
    marginBottom: "16px !important",
    color: token.colorTextSecondary,
  },
}));
