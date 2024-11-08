import React, { useState, useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  const [newTask, setNewTask] = useState('');
  const taskCompleteAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask({
        id: crypto.randomUUID(),
        text: newTask.trim(),
        completed: false,
      });
      setNewTask('');
    }
  };

  const handleToggleTask = (id: string) => {
    onToggleTask(id);
    const task = tasks.find(task => task.id === id);
    if (task && !task.completed) {
      taskCompleteAudioRef.current?.play();
    }
  };

  return (
    <div className="w-full max-w-md">
      <audio ref={taskCompleteAudioRef} src="src/components/234564__foolboymedia__.wav" />

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-rose-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-2 rounded-lg border-2 border-gray-200 px-4 py-2 dark:border-gray-700 ${task.completed ? 'animate-completed' : ''
              }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              className="h-5 w-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
            />
            <span
              className={`flex-1 ${task.completed ? 'text-gray-400 line-through' : ''
                }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}