import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { About } from "../screens/about/about";
import { Home } from "../screens/home/home";
import { Url } from "../screens/url-parse-encode/url";
import { RootLayout } from "./root-layout";

// Root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const urlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/url",
  component: Url,
});

// Route tree
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, urlRoute]);

// Router instance
export const router = createRouter({ routeTree });

// Type declaration for router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
