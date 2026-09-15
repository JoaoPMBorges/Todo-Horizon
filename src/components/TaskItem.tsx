import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onPress: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete, onPress }: TaskItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(task.id)}
      activeOpacity={0.7}
      accessibilityLabel={`Tarefa: ${task.title}`}
      accessibilityHint="Toque para ver detalhes"
    >
      {/* Checkbox de status */}
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.checkbox}
        accessibilityLabel={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={26}
          color={task.completed ? '#6C63FF' : '#BDBDBD'}
        />
      </TouchableOpacity>

      {/* Título da tarefa */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]} numberOfLines={2}>
          {task.title}
        </Text>
        <View style={[styles.badge, task.completed ? styles.badgeCompleted : styles.badgePending]}>
          <Text style={styles.badgeText}>{task.completed ? 'Concluída' : 'Pendente'}</Text>
        </View>
      </View>

      {/* Botão de excluir */}
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
        accessibilityLabel="Excluir tarefa"
      >
        <Ionicons name="trash-outline" size={20} color="#FF5252" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 16, marginVertical: 6, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  checkbox: { marginRight: 12 },
  textContainer: { flex: 1, gap: 4 },
  title: { fontSize: 15, color: '#212121', fontWeight: '500' },
  titleCompleted: { textDecorationLine: 'line-through', color: '#9E9E9E' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeCompleted: { backgroundColor: '#E8F5E9' },
  badgePending: { backgroundColor: '#FFF3E0' },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#616161' },
  deleteButton: { padding: 6, marginLeft: 8 },
});
