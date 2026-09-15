import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, CreateTaskInput } from '../types/task';
import { fetchTodos, createTodo } from '../api/todos';

const STORAGE_KEY = '@todo_horizon:tasks';

interface TasksContextData {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<Task>;
  getTaskById: (id: number) => Task | undefined;
}

const TasksContext = createContext<TasksContextData | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiData = await fetchTodos();
      setTasks(apiData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(apiData));
    } catch {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setTasks(JSON.parse(data) as Task[]);
      } else {
        setError('Sem conexão e sem dados em cache. Verifique sua internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createTask = async (input: CreateTaskInput) => {
    const created = await createTodo(input);
    const newTask: Task = {
      ...created,
      id: Date.now(),
      title: input.title,
      completed: input.completed,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTask;
  };

  const getTaskById = (id: number) => {
    return tasks.find((t) => t.id === id);
  };

  return (
    <TasksContext.Provider value={{ tasks, loading, error, loadData, createTask, getTaskById }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext deve ser usado dentro de TasksProvider');
  }
  return context;
}
