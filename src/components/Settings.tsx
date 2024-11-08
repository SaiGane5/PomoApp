import React from 'react';
import { TimerSettings } from '../types';

interface SettingsProps {
  settings: TimerSettings;
  onUpdateSettings: (settings: TimerSettings) => void;
}

export default function Settings({ settings, onUpdateSettings }: SettingsProps) {
  const handleChange = (field: keyof TimerSettings, value: number) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="w-full max-w-md space-y-4 rounded-lg border-2 border-gray-200 p-6 dark:border-gray-700">
      <h2 className="text-xl font-semibold">Timer Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={settings.workMinutes}
            onChange={(e) =>
              handleChange('workMinutes', Math.max(1, parseInt(e.target.value)))
            }
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-rose-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Short Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={settings.shortBreakMinutes}
            onChange={(e) =>
              handleChange(
                'shortBreakMinutes',
                Math.max(1, parseInt(e.target.value))
              )
            }
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-rose-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Long Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={settings.longBreakMinutes}
            onChange={(e) =>
              handleChange(
                'longBreakMinutes',
                Math.max(1, parseInt(e.target.value))
              )
            }
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-rose-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Sessions until Long Break
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={settings.sessionsUntilLongBreak}
            onChange={(e) =>
              handleChange(
                'sessionsUntilLongBreak',
                Math.max(1, parseInt(e.target.value))
              )
            }
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-rose-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
}