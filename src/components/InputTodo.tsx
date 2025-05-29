import React from "react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
interface InputTodoProps {
  onAddTask: (task: string) => void;
  handleSelectAll: () => void;
  tasks: { id: number; content: string }[];
}

const InputTodo: React.FC<InputTodoProps> = ({
  onAddTask,
  handleSelectAll,
  tasks,
}) => {
  const [inputTask, setInputTask] = useState("");
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTask.trim() !== "") {
      onAddTask(inputTask.trim());
      setInputTask("");
    }
  };

  return (
    <div className="flex items-center justify-center w-full relative">
      {tasks.length > 0 && (
        <label className="absolute  left-15 top-15 z-10 cursor-pointer ">
          <input
            type="checkbox"
            className="absolute opacity-0 "
            onChange={handleSelectAll}
          />
          <span className="flex flex-col items-center border-none rounded-full text-3xl transform rotate-90 before:content-['❯'] before:text-gray-400 before:absolute before:top-0.5 before:left-1.5"></span>
        </label>
      )}

      <input
        type="text"
        value={inputTask}
        onChange={(e) => setInputTask(e.target.value)}
        onKeyDown={handleSubmit}
        className="bg-white pl-16 py-10 h-[65px] mt-8 border-gray-200 w-full text-3xl border  outline-none transition-shadow duration-300 focus:shadow-[0_0_7px_1px_var(--color-custom-red)]"
        placeholder="What needs to be done?"
      />

      {/* <label>New Todo Input</label> */}
    </div>
  );
};

export default InputTodo;
