import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Webapp } from "./webapp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Webapp />
  </StrictMode>
);
