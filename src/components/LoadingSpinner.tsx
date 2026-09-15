import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6C63FF" />
      <Text style={styles.text}>Carregando tarefas...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  text: {
    fontSize: 15,
    color: '#9E9E9E',
  },
});
