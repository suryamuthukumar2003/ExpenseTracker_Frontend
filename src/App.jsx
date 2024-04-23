import { useState, Fragment, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Album } from "./album";
import Expense from "./expense";

function App() {
  return (
    <>
      {/* <Album /> */}
      <Expense/>
    </>
  );
}

export default App;
