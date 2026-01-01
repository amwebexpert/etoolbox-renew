import { createRootRoute, createRoute, createRouter, Navigate } from "@tanstack/react-router";
import { RootLayout } from "~/routes/root-layout";
import { About } from "~/screens/about/about";
import { Home } from "~/screens/home/home";
import { UrlCurl } from "~/screens/url-parse-encode/curl/url-curl";
import { UrlEncoder } from "~/screens/url-parse-encode/encoder/url-encoder";
import { UrlParser } from "~/screens/url-parse-encode/parser/url-parser";
import { Url } from "~/screens/url-parse-encode/url";

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

// URL parent route with layout
const urlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/url",
  component: Url,
});

// URL index route - redirects to /url/curl
const urlIndexRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/",
  component: () => <Navigate to="/url/encoder" replace />,
});

// URL child routes
const urlCurlRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/curl",
  component: UrlCurl,
});

const urlParserRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/parser",
  component: UrlParser,
});

const urlEncoderRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/encoder",
  component: UrlEncoder,
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  urlRoute.addChildren([urlIndexRoute, urlCurlRoute, urlParserRoute, urlEncoderRoute]),
]);

// Router instance
export const router = createRouter({ routeTree });

// Type declaration for router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
