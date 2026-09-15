import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Busca as primeiras 20 tarefas para não sobrecarregar a lista
export async function fetchTodos(): Promise<Task[]> {
  const response = await fetch(`${BASE_URL}/todos?_limit=20`);

  if (!response.ok) {
    throw new Error('Falha ao buscar tarefas. Verifique sua conexão.');
  }

  return response.json();
}

// Cria uma nova tarefa — JSONPlaceholder retorna id 201 sempre (simulado)
export async function createTodo(input: CreateTaskInput): Promise<Task> {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, userId: 1 }),
  });

  if (!response.ok) {
    throw new Error('Falha ao criar tarefa.');
  }

  return response.json();
}

// Edita uma tarefa
export async function updateTodo(id: number, input: UpdateTaskInput): Promise<Task> {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, id, userId: 1 }),
  });

  if (!response.ok) {
    throw new Error('Falha ao editar tarefa.');
  }

  return response.json();
}

// Remove uma tarefa
export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Falha ao excluir tarefa.');
  }
}
