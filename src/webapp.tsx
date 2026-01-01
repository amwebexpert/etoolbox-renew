import { RouterProvider } from "@tanstack/react-router";
import { ConfigProvider, theme } from "antd";
import { router } from "~/routes/router";
import { useSettingsStore } from "~/stores/settings.store";

// Theme colors inspired by etoolbox
const PRIMARY_COLOR = "#bf3a2b";
const SECONDARY_COLOR = "#e84b3c";

export const Webapp = () => {
  const themeMode = useSettingsStore((state) => state.themeMode);

  // Custom theme configuration
  const customTheme = {
    token: {
      colorPrimary: PRIMARY_COLOR,
      colorLink: SECONDARY_COLOR,
      borderRadius: 8,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    algorithm:
      themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
