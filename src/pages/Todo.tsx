import React from "react";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import { useState } from "react";

const Todo: React.FC = () => {
  interface Task {
    id: number;
    content: string;
  }
  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isChecked, setIsChecked] = useState<Record<number, boolean>>({});
  const addTask = (taskContent: string) => {
    if (taskContent.trim() !== "") {
      const newTask: Task = {
        id: generateId(),
        content: taskContent.trim(),
      };
      setTasks([...tasks, newTask]);
    }
  };
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleUpdateTask = (id: Number, newContent: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, content: newContent };
        }
        return task;
      })
    );
  };
  const handleClearTasksCompleted = (completedIds: number[]) => {
    setTasks(tasks.filter((task) => !completedIds.includes(task.id)));
  };

  const handleSelectAll = () => {
    const isAllSelected = tasks.every((task) => isChecked[task.id]);
    const newCheckedState = { ...isChecked };
    tasks.forEach((task) => {
      newCheckedState[task.id] = !isAllSelected;
    });
    setIsChecked(newCheckedState);
    console.log("Final newCheckedState:", newCheckedState);
  };
  return (
    <div className="">
      <header className="flex flex-col items-center justify-center w-full h-full bg-[var(--color-custom-blue)]">
        <h1 className="text-[var(--color-custom-red)] text-[80px] text-center w-full">
          todos
        </h1>
        <div className="w-full focus:shadow-[0_0_7px_1px_var(--color-custom-red)] z-3 transition-shadow duration-300 ">
          <InputTodo
            onAddTask={addTask}
            tasks={tasks}
            handleSelectAll={handleSelectAll}
          />
        </div>
      </header>

      <TodoList
        handleDeleteTask={handleDeleteTask}
        tasks={tasks}
        handleUpdateTask={handleUpdateTask}
        handleClearTasksCompleted={handleClearTasksCompleted}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  );
};

export default Todo;
