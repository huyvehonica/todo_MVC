import React from "react";

interface FooterTodoProps {
  tasks: Task[];
  isChecked: Record<number, boolean>;
  filter?: "all" | "active" | "completed";
  setFilter?: (filter: "all" | "active" | "completed") => void;
  handleClearCompleted?: () => void;
}
interface Task {
  id: number;
  content: string;
  isDelete?: boolean;
}
const FooterTodo: React.FC<FooterTodoProps> = ({
  tasks,
  isChecked,
  filter,
  setFilter,
  handleClearCompleted,
}) => {
  const uncheckedCount = tasks.filter((task) => !isChecked[task.id]).length;
  const handleBlur = () => {
    if (handleClearCompleted) {
      handleClearCompleted();
    }
  };
  return (
    <>
      <footer className="flex w-full text-lg text-center border-t border-gray-200 justify-between items-center p-[10px_15px] bg-white ">
        <span className="text-left">{uncheckedCount} item left</span>
        <ul className="flex gap-4 group ">
          <li
            onClick={() => setFilter?.("all")}
            className={`cursor-pointer p-1 border  ${
              filter === "all"
                ? " border-[var(--color-custom-red)] transition-shadow duration-300 shadow-[0_0_7px_1px_var(--color-custom-red)]"
                : "border-transparent hover:border-[var(--color-custom-red)]"
            }`}
          >
            All
          </li>
          <li
            onClick={() => setFilter?.("active")}
            onBlur={handleBlur}
            className={`cursor-pointer p-1 border ${
              filter === "active"
                ? "border-[var(--color-custom-red)] transition-shadow duration-300 shadow-[0_0_7px_1px_var(--color-custom-red)]"
                : "border-transparent hover:border-[var(--color-custom-red)]"
            }`}
          >
            Active
          </li>
          <li
            onClick={() => setFilter?.("completed")}
            className={`cursor-pointer p-1 border ${
              filter === "completed"
                ? " border-[var(--color-custom-red)] transition-shadow duration-300 shadow-[0_0_7px_1px_var(--color-custom-red)]"
                : "border-transparent hover:border-[var(--color-custom-red)]"
            }`}
          >
            Completed
          </li>
        </ul>
        <button
          className="cursor-pointer hover:underline"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      </footer>
      <div className="h-2 bg-white border-t border-gray-200 shadow-md w-[98%] shadow-gray-400  mx-auto"></div>
      <div className="h-2 bg-white border-t border-gray-200 shadow-sm w-[96%] shadow-gray-400 mx-auto"></div>
    </>
  );
};

export default FooterTodo;
