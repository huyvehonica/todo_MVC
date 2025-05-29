import React from "react";

const Beside: React.FC = () => {
  return (
    <aside className=" rounded-lg p-[10px] absolute  top-2 left-0 w-[327px] h-full ">
      <h3>React</h3>
      <span>
        <h5>React</h5>
        <a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react">
          Source
        </a>
        <h5>TypeScript + React</h5>
        <a href="https://todomvc.com/examples/typescript-react">Demo</a>", "
        <a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react">
          Source
        </a>
      </span>
    </aside>
  );
};

export default Beside;
