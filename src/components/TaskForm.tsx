import React, { useState } from 'react';
import { isValidTitle } from '../utils/validation';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from 'react-native';

interface TaskFormProps {
  initialTitle?: string;
  initialCompleted?: boolean;
  onSubmit: (title: string, completed: boolean) => Promise<void>;
  submitLabel: string;
}

export function TaskForm({
  initialTitle = '',
  initialCompleted = false,
  onSubmit,
  submitLabel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [completed, setCompleted] = useState(initialCompleted);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleTitleChange(text: string) {
    setTitle(text);
    if (titleError) {
      if (isValidTitle(text).isValid) setTitleError(null);
    }
  }

  async function handleSubmit() {
    const result = isValidTitle(title);
    if (!result.isValid) {
      setTitleError(result.error);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(title.trim(), completed);
    } finally {
      setSubmitting(false);
    }
  }

  const charCount = title.length;
  const isNearLimit = charCount > 85;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={[styles.input, titleError ? styles.inputError : null]}
        value={title}
        onChangeText={handleTitleChange}
        placeholder="O que precisa ser feito?"
        placeholderTextColor="#BDBDBD"
        maxLength={100}
        multiline
        returnKeyType="done"
        accessibilityLabel="Título da tarefa"
        accessibilityHint="Obrigatório, entre 3 e 100 caracteres"
      />
      <View style={styles.inputFooter}>
        {titleError ? (
          <Text style={styles.errorText}>{titleError}</Text>
        ) : (
          <Text style={styles.hint}>Mínimo 3, máximo 100 caracteres</Text>
        )}
        <Text style={[styles.charCount, isNearLimit && styles.charCountWarning]}>
          {charCount}/100
        </Text>
      </View>
      <View style={styles.toggleRow}>
        <View>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.toggleSubtitle}>{completed ? 'Concluída ✅' : 'Pendente ⏳'}</Text>
        </View>
        <Switch
          value={completed}
          onValueChange={setCompleted}
          trackColor={{ false: '#E0E0E0', true: '#B39DFF' }}
          thumbColor={completed ? '#6C63FF' : '#9E9E9E'}
          accessibilityLabel="Status da tarefa"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
        accessibilityLabel={submitLabel}
        activeOpacity={0.8}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#424242', marginBottom: 6, marginTop: 16 },
  input: { borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 10, padding: 14, fontSize: 15, color: '#212121', backgroundColor: '#FAFAFA', minHeight: 80, textAlignVertical: 'top' },
  inputError: { borderColor: '#FF5252', backgroundColor: '#FFF5F5' },
  inputFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  errorText: { fontSize: 12, color: '#FF5252', flex: 1 },
  hint: { fontSize: 12, color: '#9E9E9E', flex: 1 },
  charCount: { fontSize: 12, color: '#9E9E9E', marginLeft: 8 },
  charCountWarning: { color: '#FF9800', fontWeight: '600' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: 10, padding: 14, marginTop: 16, borderWidth: 1.5, borderColor: '#E0E0E0' },
  toggleSubtitle: { fontSize: 13, color: '#757575', marginTop: 2 },
  button: { backgroundColor: '#6C63FF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 28, shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
