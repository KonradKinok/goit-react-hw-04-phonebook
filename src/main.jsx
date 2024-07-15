import './globalStyles/index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import * as Phonebook from "./components/Phonebook/index"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Phonebook.Contacts />
  </React.StrictMode>,
);
