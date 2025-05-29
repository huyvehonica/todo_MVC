import React from "react";
import Todo from "./pages/Todo";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <section className="h-full w-full max-w-[600px] bg-hsla(0, 0%, 100%, 0.1) mx-auto">
        <Todo />
      </section>
    </BrowserRouter>
  );
};

export default App;
