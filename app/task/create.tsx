import React from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasksContext } from '../../src/context/TasksContext';
import { TaskForm } from '../../src/components/TaskForm';

export default function CreateTaskScreen() {
  const router = useRouter();
  const { createTask } = useTasksContext();

  async function handleCreate(title: string, completed: boolean) {
    try {
      await createTask({ title, completed });
      router.back();
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a tarefa. Tente novamente.');
    }
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TaskForm onSubmit={handleCreate} submitLabel="Criar Tarefa" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
});
