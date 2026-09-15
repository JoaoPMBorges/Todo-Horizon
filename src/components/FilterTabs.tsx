import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterType } from '../types/task';

interface FilterTabsProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
  counts: { all: number; pending: number; completed: number };
}

const TABS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
];

export function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, active === tab.key && styles.tabActive]}
          onPress={() => onChange(tab.key)}
          accessibilityLabel={`Filtrar: ${tab.label}`}
          accessibilityState={{ selected: active === tab.key }}
        >
          <Text style={[styles.label, active === tab.key && styles.labelActive]}>
            {tab.label}
          </Text>
          <View style={[styles.count, active === tab.key && styles.countActive]}>
            <Text style={[styles.countText, active === tab.key && styles.countTextActive]}>
              {counts[tab.key]}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 10, backgroundColor: '#EEEEEE', borderRadius: 10, padding: 4 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: 8, gap: 4 },
  tabActive: { backgroundColor: '#6C63FF' },
  label: { fontSize: 12, fontWeight: '600', color: '#757575' },
  labelActive: { color: '#fff' },
  count: { backgroundColor: '#BDBDBD', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 1 },
  countActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  countText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  countTextActive: { color: '#fff' },
});

