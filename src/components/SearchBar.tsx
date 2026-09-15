import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Buscar tarefas...' }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color="#9E9E9E" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#BDBDBD"
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel="Buscar tarefas"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} accessibilityLabel="Limpar busca">
          <Ionicons name="close-circle" size={18} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 16, marginBottom: 10, paddingHorizontal: 12, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#212121' },
});

