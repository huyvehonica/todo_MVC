import React, { useEffect } from "react";
import FooterTodo from "./FooterTodo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TodoListProps {
  tasks: Task[];
  handleDeleteTask: (id: number) => void;
  handleUpdateTask: (id: Number, newContent: string) => void;
  handleClearTasksCompleted: (comppletedIds: number[]) => void;
  isChecked: Record<number, boolean>;
  setIsChecked: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}
interface Task {
  id: number;
  content: string;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  handleDeleteTask,
  handleUpdateTask,
  handleClearTasksCompleted,
  isChecked,
  setIsChecked,
}) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const handleCheckboxChange = (id: number) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    if (filter === "active") {
      navigate("/active");
    }
    if (filter === "completed") {
      navigate("/completed");
    }
    if (filter === "all") {
      navigate("/");
    }
  }, [filter, navigate]);
  const filteredTask = tasks.filter((task) => {
    if (filter === "active") {
      return !isChecked[task.id];
    }
    if (filter === "completed") {
      return isChecked[task.id];
    }

    return true;
  });
  const handleEditDoubleClick = (task: Task) => {
    setEditingId(task.id);
    setEditContent(task.content);
  };
  const handleEditComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editContent.trim() !== "") {
      handleUpdateTask(editingId!, editContent.trim());
      setEditingId(null);
      setEditContent("");
    }
  };
  const handleEditBlur = () => {
    if (editContent.trim() !== "") {
      handleUpdateTask(editingId!, editContent.trim());
    }
    setEditingId(null);
    setEditContent("");
  };
  const handleClearCompleted = () => {
    const completedIds = Object.entries(isChecked)
      .filter(([_, isChecked]) => isChecked)
      .map(([id]) => Number(id));
    handleClearTasksCompleted(completedIds);
  };
  return (
    <div className="w-full ">
      {tasks.length >= 1 && (
        <>
          <main className="relative z-2  w-full">
            <div>
              <ul className="group ">
                {filteredTask.map((task) => (
                  <li
                    key={task.id}
                    className={`bg-white p-4 border-l border-r   border-gray-200 w-full transition-shadow duration-100
                ${
                  editingId === task.id
                    ? "shadow-[0_0_7px_1px_var(--color-custom-red)] border z-10 relative my-0.5"
                    : ""
                }`}
                    onMouseEnter={() => setHoveredIndex(task.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="flex items-center gap-4 "
                      onDoubleClick={() => handleEditDoubleClick(task)}
                    >
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <input
                          type="checkbox"
                          id={`task-${task.id}`}
                          className="absolute opacity-0 w-10 h-10"
                          checked={isChecked[task.id]}
                          onChange={() => handleCheckboxChange(task.id)}
                        />
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`block w-9 h-9 rounded-full border cursor-pointer transition-all duration-200
                          ${
                            isChecked[task.id]
                              ? "border-green-500 "
                              : "border-gray-300 "
                          }`}
                        >
                          {isChecked[task.id] && (
                            <svg
                              className="w-full h-full text-green-400 p-1"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              xmlns="http://www..org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </label>
                      </div>
                      {editingId === task.id ? (
                        <input
                          className="text-2xl border-none outline-none w-full bg-transparent "
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={handleEditComplete}
                          onBlur={handleEditBlur}
                          autoFocus
                        />
                      ) : (
                        <div className="flex justify-between w-full items-center ">
                          <label
                            className={`${
                              isChecked[task.id]
                                ? "line-through text-gray-500"
                                : ""
                            } text-6xl pl-4 text-gray-6  max-w-[calc(600px-80px)] break-words whitespace-normal text-left `}
                          >
                            {task.content}
                          </label>
                          <button
                            className={`transition-opacity ${
                              hoveredIndex === task.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>

          <FooterTodo
            tasks={tasks}
            isChecked={isChecked}
            filter={filter}
            setFilter={setFilter}
            handleClearCompleted={handleClearCompleted}
          />
        </>
      )}

      {/* <span className="text-gray-500 text-sm">
        {isChecked.filter((checked) => checked).length} completed
      </span> */}
    </div>
  );
};

export default TodoList;
