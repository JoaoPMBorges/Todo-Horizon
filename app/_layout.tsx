import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TasksProvider } from '../src/context/TasksContext';

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#6C63FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#F5F5F5' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Minhas Tarefas' }} />
        <Stack.Screen name="task/create" options={{ title: 'Nova Tarefa', presentation: 'modal' }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Detalhes da Tarefa' }} />
      </Stack>
    </TasksProvider>
  );
}
