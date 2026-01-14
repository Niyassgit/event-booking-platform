import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import "./services/axiosInterceptor.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-right" />
      <App />
    </Provider>
  </StrictMode>
);
