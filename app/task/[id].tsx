import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTasksContext } from '../../src/context/TasksContext';
import { TaskForm } from '../../src/components/TaskForm';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTaskById, editTask, removeTask } = useTasksContext();
  const [isEditing, setIsEditing] = useState(false);

  const task = getTaskById(Number(id));

  if (!task) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={60} color="#BDBDBD" />
        <Text style={styles.notFoundText}>Tarefa não encontrada.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleEdit(title: string, completed: boolean) {
    try {
      await editTask(task!.id, { title, completed });
      setIsEditing(false);
      Alert.alert('✅ Sucesso', 'Tarefa atualizada!');
    } catch {
      Alert.alert('Erro', 'Não foi possível editar a tarefa.');
    }
  }

  function handleDelete() {
    removeTask(task!.id, () => router.back());
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Card de informações da tarefa */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.statusDot, task.completed ? styles.dotCompleted : styles.dotPending]} />
          <Text style={styles.statusText}>{task.completed ? 'Concluída' : 'Pendente'}</Text>
        </View>
        <Text style={styles.taskId}>Tarefa #{task.id}</Text>
        <Text style={styles.taskTitle}>{task.title}</Text>
      </View>

      {/* Ações */}
      {!isEditing ? (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)} activeOpacity={0.8}>
            <Ionicons name="pencil-outline" size={18} color="#fff" />
            <Text style={styles.editButtonText}>Editar Tarefa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={18} color="#FF5252" />
            <Text style={styles.deleteButtonText}>Excluir Tarefa</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.editingHeader}>
            <Text style={styles.editingTitle}>Editando tarefa</Text>
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Ionicons name="close-outline" size={24} color="#757575" />
            </TouchableOpacity>
          </View>
          <TaskForm
            initialTitle={task.title}
            initialCompleted={task.completed}
            onSubmit={handleEdit}
            submitLabel="Salvar alterações"
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  card: { backgroundColor: '#fff', margin: 16, borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  dotCompleted: { backgroundColor: '#4CAF50' },
  dotPending: { backgroundColor: '#FF9800' },
  statusText: { fontSize: 13, fontWeight: '600', color: '#757575' },
  taskId: { fontSize: 12, color: '#BDBDBD', marginBottom: 8 },
  taskTitle: { fontSize: 18, fontWeight: '600', color: '#212121', lineHeight: 26 },
  actions: { paddingHorizontal: 16, gap: 12 },
  editButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6C63FF', borderRadius: 12, padding: 16, gap: 8, shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  editButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, gap: 8, borderWidth: 1.5, borderColor: '#FF5252' },
  deleteButtonText: { color: '#FF5252', fontSize: 15, fontWeight: '600' },
  editingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 },
  editingTitle: { fontSize: 16, fontWeight: '700', color: '#424242' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingBottom: 80 },
  notFoundText: { fontSize: 16, color: '#9E9E9E' },
  backButton: { backgroundColor: '#6C63FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, marginTop: 8 },
  backButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
