import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="wifi-outline" size={64} color="#FF5252" />
      <Text style={styles.title}>Ops! Algo deu errado</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
        <Ionicons name="refresh-outline" size={18} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, gap: 12, paddingBottom: 60 },
  title: { fontSize: 18, fontWeight: '700', color: '#424242', textAlign: 'center' },
  message: { fontSize: 14, color: '#9E9E9E', textAlign: 'center', lineHeight: 20 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6C63FF', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 12, marginTop: 8, gap: 8 },
  buttonIcon: {},
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
