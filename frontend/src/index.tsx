import { root } from "@lynx-js/react";

import { App } from "./App.tsx";
import "tailwindcss/utilities.css";
import "./app.css";

import { QueryProvider } from "../context/queryClient.tsx"
root.render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
