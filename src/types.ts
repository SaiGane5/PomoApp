export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface TimerSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsUntilLongBreak: number;
}

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'running' | 'paused' | 'stopped';