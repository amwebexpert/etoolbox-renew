import { Typography } from "antd";

import { ScreenContainer } from "~/components/ui/screen-container";

const { Title, Paragraph } = Typography;

export const UrlCurl = () => {
  return (
    <ScreenContainer>
      <Title level={4}>cURL Builder</Title>
      <Paragraph type="secondary">Construisez et analysez des commandes cURL</Paragraph>
    </ScreenContainer>
  );
};
