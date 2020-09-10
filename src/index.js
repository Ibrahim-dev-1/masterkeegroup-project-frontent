import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AuthenticationProvider } from "./contexts/authenticationProvider";
import { FoldProvider } from "./contexts/foldesProvider";
import { FilesProvider } from "./contexts/filesProvider";

ReactDOM.render(
  <AuthenticationProvider>
    <FoldProvider>
      <FilesProvider>
        <App />
      </FilesProvider>
    </FoldProvider>
    ,
  </AuthenticationProvider>,
  document.getElementById("root")
);
