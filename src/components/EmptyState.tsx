import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  isSearching?: boolean;
}

export function EmptyState({ isSearching = false }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={isSearching ? 'search-outline' : 'clipboard-outline'}
        size={64}
        color="#BDBDBD"
      />
      <Text style={styles.title}>
        {isSearching ? 'Nenhum resultado' : 'Nenhuma tarefa ainda'}
      </Text>
      <Text style={styles.subtitle}>
        {isSearching
          ? 'Tente buscar com outros termos.'
          : 'Toque no botão + para adicionar sua primeira tarefa!'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, gap: 12, paddingBottom: 60 },
  title: { fontSize: 18, fontWeight: '700', color: '#757575', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#BDBDBD', textAlign: 'center', lineHeight: 20 },
});
