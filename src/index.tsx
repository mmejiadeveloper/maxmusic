import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import App from "./views/App";

// https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
/**
 * The reason why strict mode was disabled it is because it double mounts the component, this only happends in dev mode not in production, if this comes to
 * be deployed please add strict mode again
 */

const BaseComponent = () => {
  if (process.env.NODE_ENV !== "production") return <App />;

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BaseComponent />
);
