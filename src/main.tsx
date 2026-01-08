import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Webapp } from "~/webapp";
import "~/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Webapp />
  </StrictMode>,
);
