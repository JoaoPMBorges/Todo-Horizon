import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, CreateTaskInput, UpdateTaskInput, FilterType } from '../types/task';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';

const STORAGE_KEY = '@todo_horizon:tasks';

interface TasksContextData {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  searchText: string;
  filter: FilterType;
  setSearchText: (text: string) => void;
  setFilter: (filter: FilterType) => void;
  loadData: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<Task>;
  editTask: (id: number, input: UpdateTaskInput) => Promise<void>;
  removeTask: (id: number, onSuccess?: () => void) => void;
  toggleTask: (id: number) => Promise<void>;
  getTaskById: (id: number) => Task | undefined;
}

const TasksContext = createContext<TasksContextData | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

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

  const editTask = async (id: number, input: UpdateTaskInput) => {
    if (id <= 200) {
      await updateTodo(id, input);
    }
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, title: input.title, completed: input.completed } : t
    );
    setTasks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeTask = (id: number, onSuccess?: () => void) => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              if (id <= 200) {
                await deleteTodo(id);
              }
              const updated = tasks.filter((t) => t.id !== id);
              setTasks(updated);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
              if (onSuccess) onSuccess();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
            }
          },
        },
      ]
    );
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updatedInput: UpdateTaskInput = { title: task.title, completed: !task.completed };
    try {
      if (id <= 200) {
        await updateTodo(id, updatedInput);
      }
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      setTasks(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  const getTaskById = (id: number) => {
    return tasks.find((t) => t.id === id);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <TasksContext.Provider
      value={{
        tasks, filteredTasks, loading, error, searchText, filter,
        setSearchText, setFilter, loadData, createTask, editTask,
        removeTask, toggleTask, getTaskById,
      }}
    >
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
