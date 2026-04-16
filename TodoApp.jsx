import { useState, useEffect } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>To-Do List</h2>

      <input
        type="text"
        placeholder="Enter task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
