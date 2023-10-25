import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
// import store from "./redux/store.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/index.js";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

const domain = "dev-z6m6gqvk1n86jl3t.us.auth0.com";
const clientId = "wNC4E25A6amhFM2wKiez7MLKcTZAbrY7";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
        >
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Auth0Provider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
