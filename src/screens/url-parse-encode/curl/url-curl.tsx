import { CodeOutlined, CopyOutlined, SwapOutlined } from "@ant-design/icons";
import { getErrorMessage } from "@lichens-innovation/ts-common";
import { Button, Input, message, Select, Space, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { useUrlCurlStore } from "./url-curl.store";
import { CONVERTERS_LIST, getSyntaxLanguage, isBlank, transformCurl } from "./url-curl.utils";

const { TextArea } = Input;

export const UrlCurl = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const [messageApi, contextHolder] = message.useMessage();

  const { inputCurl, targetLanguage, transformedResult, setInputCurl, setTargetLanguage, setTransformedResult } =
    useUrlCurlStore();

  const handleConvert = () => {
    const result = transformCurl(inputCurl, targetLanguage);
    setTransformedResult(result);
  };

  const handleLanguageChange = (value: string) => {
    setTargetLanguage(value);
    if (!isBlank(inputCurl)) {
      const result = transformCurl(inputCurl, value);
      setTransformedResult(result);
    }
  };

  const handleCopy = async () => {
    if (!transformedResult) return;

    try {
      await navigator.clipboard.writeText(transformedResult);
      messageApi.success("Copied to clipboard!");
    } catch (e: unknown) {
      messageApi.error("Failed to copy to clipboard: " + getErrorMessage(e));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setInputCurl(value);
    if (!value) {
      setTransformedResult("");
    }
  };

  const handleSwap = () => {
    setInputCurl(transformedResult);
    setTransformedResult("");
  };

  const syntaxLanguage = getSyntaxLanguage(targetLanguage);

  const languageOptions = CONVERTERS_LIST.map((lang) => ({
    value: lang,
    label: lang,
  }));

  return (
    <ScreenContainer>
      {contextHolder}

      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<CodeOutlined />}
          title="cURL Converter"
          description="Convert cURL commands to various programming languages"
        />

        <TextArea
          placeholder="Paste or type the cURL command here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputCurl}
          onChange={handleInputChange}
          className={styles.textArea}
        />

        <div className={styles.toolbar}>
          <Select
            value={targetLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            disabled={isBlank(inputCurl)}
            className={styles.languageSelect}
            popupMatchSelectWidth={false}
            showSearch
            placeholder="Target language"
          />

          <div className={styles.spacer} />

          <Space size="small" wrap>
            <Tooltip title="Swap: put result into input">
              <Button icon={<SwapOutlined />} disabled={!transformedResult} onClick={handleSwap} />
            </Tooltip>

            <Tooltip title="Copy result to clipboard">
              <Button icon={<CopyOutlined />} disabled={!transformedResult} onClick={handleCopy}>
                {!isMobile && "Copy"}
              </Button>
            </Tooltip>

            <Button type="primary" icon={<CodeOutlined />} disabled={isBlank(inputCurl)} onClick={handleConvert}>
              {isMobile ? "Conv." : "Convert"}
            </Button>
          </Space>
        </div>

        {transformedResult && (
          <div className={styles.resultSection}>
            <Typography.Text type="secondary" className={styles.resultLabel}>
              Result ({syntaxLanguage})
            </Typography.Text>
            <div className={styles.resultBox}>
              <pre className={styles.resultPre}>
                <code className={styles.resultCode}>{transformedResult}</code>
              </pre>
            </div>
          </div>
        )}
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
  languageSelect: {
    minWidth: 140,
    "@media (max-width: 576px)": {
      minWidth: 120,
    },
  },
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  resultBox: {
    padding: 16,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflowX: "auto",
    maxHeight: 500,
    overflowY: "auto",
  },
  resultPre: {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  resultCode: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 1.5,
    color: token.colorText,
  },
}));
