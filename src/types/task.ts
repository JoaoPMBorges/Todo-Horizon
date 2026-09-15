export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type CreateTaskInput = {
  title: string;
  completed: boolean;
};

export type UpdateTaskInput = {
  title: string;
  completed: boolean;
};

export type FilterType = 'all' | 'pending' | 'completed';
