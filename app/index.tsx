import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTasksContext } from '../src/context/TasksContext';
import { TaskItem } from '../src/components/TaskItem';
import { SearchBar } from '../src/components/SearchBar';
import { FilterTabs } from '../src/components/FilterTabs';
import { EmptyState } from '../src/components/EmptyState';
import { LoadingSpinner } from '../src/components/LoadingSpinner';
import { ErrorState } from '../src/components/ErrorState';

export default function HomeScreen() {
  const router = useRouter();
  const {
    tasks, filteredTasks, loading, error,
    searchText, filter, setSearchText, setFilter,
    loadData, toggleTask, removeTask,
  } = useTasksContext();

  function handleToggle(id: number) { toggleTask(id); }
  function handleDelete(id: number) { removeTask(id); }
  function handleTaskPress(id: number) { router.push(`/task/${id}`); }

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={loadData} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          {counts.pending} pendente{counts.pending !== 1 ? 's' : ''} · {counts.completed} concluída{counts.completed !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <>
            <SearchBar value={searchText} onChangeText={setSearchText} />
            <FilterTabs active={filter} onChange={setFilter} counts={counts} />
          </>
        }
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} onDelete={handleDelete} onPress={handleTaskPress} />
        )}
        ListEmptyComponent={<EmptyState isSearching={!!searchText} />}
        contentContainerStyle={filteredTasks.length === 0 ? styles.emptyList : styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.fabWrapper}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/task/create')}
          accessibilityLabel="Adicionar nova tarefa"
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerSubtitle: { fontSize: 13, color: '#9E9E9E', fontWeight: '500' },
  list: { paddingBottom: 100 },
  emptyList: { flexGrow: 1, paddingBottom: 100 },
  fabWrapper: { position: 'absolute', bottom: 28, right: 24 },
  fab: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center', shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
});
