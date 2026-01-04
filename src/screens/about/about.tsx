import { BulbOutlined, ExperimentOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table, Tag, Timeline, Typography } from "antd";
import { createStyles } from "antd-style";
import { ScreenContainer } from "~/components/ui/screen-container";
import { COLUMNS, VERSION_DATA } from "./about.utils";

const { Title, Paragraph, Text } = Typography;

export const About = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      {/* Hero Section */}
      <div className={styles.hero}>
        <Title level={2} className={styles.heroTitle}>
          <span>Web</span>
          <img src="/logo192.png" alt="Web Toolbox" width={36} height={36} />
          <span>Toolbox</span>
        </Title>
        <Paragraph className={styles.heroSubtitle}>A Swiss Army knife for web developers</Paragraph>
      </div>

      {/* Deployment Info */}
      <section className={styles.tableSection}>
        <Table
          columns={COLUMNS}
          dataSource={VERSION_DATA}
          pagination={false}
          size="middle"
          bordered
          showHeader={false}
          title={() => (
            <Title level={4} className={styles.tableTitle}>
              <ExperimentOutlined className={styles.sectionIcon} /> Latest Deployment
            </Title>
          )}
        />
      </section>

      {/* Origin Story */}
      <section className={styles.section}>
        <Card>
          <Timeline
            mode="alternate"
            items={[
              {
                color: "blue",
                content: (
                  <div>
                    <Tag color="blue" className={styles.timelineTag}>
                      2020
                    </Tag>
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
                    <Tag color="green" className={styles.timelineTag}>
                      Early Days
                    </Tag>
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
                    <Tag color="purple" className={styles.timelineTag}>
                      Growth
                    </Tag>
                    <Text strong>Organic Evolution</Text>
                    <Paragraph className={styles.timelineText}>
                      Every time a need arose during web or mobile development — "I wish I had a quick tool for this..."
                      — it became a candidate for the toolbox. The collection grew naturally, driven by real-world
                      needs.
                    </Paragraph>
                  </div>
                ),
              },
              {
                color: "gold",
                content: (
                  <div>
                    <Tag color="gold" className={styles.timelineTag}>
                      Today
                    </Tag>
                    <Text strong>A Complete Developer Companion</Text>
                    <Paragraph className={styles.timelineText}>
                      Now with over 15 tools, Web Toolbox has become a go-to resource. And the best part? It's still
                      growing. The features aren't fixed — if it can be done in a web SPA, it might just be the next
                      addition!
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
              <BulbOutlined className={styles.ctaIcon} style={{ color: "orange" }} />
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
              <a
                href="https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tag color="cyan" style={{ cursor: "pointer", fontSize: 14, paddingBlock: 4, paddingInline: 12 }}>
                  Learn more about contributing →
                </Tag>
              </a>
            </Col>
          </Row>
        </Card>
      </section>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  hero: {
    paddingBlock: 24,
    paddingInline: 0,
    textAlign: "center",
  },
  heroTitle: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: "8px !important",
    color: `${token.colorPrimary} !important`,
  },
  heroSubtitle: {
    color: `${token.colorTextSecondary} !important`,
  },
  section: {
    marginBottom: 48,
  },
  tableSection: {
    marginBottom: 48,
    "@media (min-width: 768px)": {
      maxWidth: 600,
      margin: "0 auto 48px auto",
    },
  },
  sectionIcon: {
    color: token.colorPrimary,
    fontSize: 24,
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
  tableTitle: {
    margin: "0 !important",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
}));
