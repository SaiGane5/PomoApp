import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Settings as SettingsIcon } from 'lucide-react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { Task, TimerSettings, TimerMode, TimerStatus } from './types';

const DEFAULT_SETTINGS: TimerSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsUntilLongBreak: 4,
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('darkMode');
      if (storedPreference !== null) {
        return JSON.parse(storedPreference);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mode, setMode] = useState<TimerMode>('work');
  const [status, setStatus] = useState<TimerStatus>('stopped');
  const [timeLeft, setTimeLeft] = useState(settings.workMinutes * 60);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const startTimer = useCallback(() => {
    setStatus('running');
    playSound('start');
  }, []);

  const pauseTimer = useCallback(() => {
    setStatus('paused');
    playSound('pause');
  }, []);

  const resetTimer = useCallback(() => {
    setStatus('stopped');
    setTimeLeft(settings.workMinutes * 60);
    setMode('work');
    setSessionsCompleted(0);
    playSound('stop');
  }, [settings.workMinutes]);

  const skipTimer = useCallback(() => {
    if (mode === 'work') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);

      if (newSessionsCompleted % settings.sessionsUntilLongBreak === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreakMinutes * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreakMinutes * 60);
      }
    } else {
      setMode('work');
      setTimeLeft(settings.workMinutes * 60);
    }
    setStatus('stopped');
    playSound('skip');
  }, [mode, sessionsCompleted, settings]);

  const playSound = (type: 'start' | 'pause' | 'stop' | 'skip') => {
    const audio = new Audio(`https://assets.mixkit.co/active_storage/sfx/2571/${type}-notification.wav`);
    audio.play().catch(() => {
      // Handle audio play error silently
    });
  };

  useEffect(() => {
    let interval: number;

    if (status === 'running' && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      skipTimer();
    }

    return () => clearInterval(interval);
  }, [status, timeLeft, skipTimer]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <SettingsIcon size={24} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <Timer
            minutes={minutes}
            seconds={seconds}
            status={status}
            mode={mode}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onSkip={skipTimer}
          />
        </div>

        <div className="mb-4 text-center">
          <p className="text-lg">
            Sessions completed: {sessionsCompleted} / {settings.sessionsUntilLongBreak}
          </p>
        </div>

        {showSettings ? (
          <Settings settings={settings} onUpdateSettings={setSettings} />
        ) : (
          <TaskList
            tasks={tasks}
            onAddTask={(task) => setTasks([...tasks, task])}
            onToggleTask={(id) =>
              setTasks(
                tasks.map((task) =>
                  task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
                )
              )
            }
            onDeleteTask={(id) =>
              setTasks(tasks.filter((task) => task.id !== id))
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;