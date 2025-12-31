import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();

  // Mobile: xs only
  const isMobile = screens.xs && !screens.sm;

  // Tablet: sm or md
  const isTablet = (screens.sm || screens.md) && !screens.lg;

  // Desktop: lg and above
  const isDesktop = screens.lg || screens.xl || screens.xxl;

  // Should show sidebar collapsed (mobile/tablet)
  const shouldCollapseSidebar = !isDesktop;

  // Should use drawer instead of sidebar (mobile only)
  const shouldUseDrawer = isMobile;

  return {
    screens,
    isMobile,
    isTablet,
    isDesktop,
    shouldCollapseSidebar,
    shouldUseDrawer,
  };
};

