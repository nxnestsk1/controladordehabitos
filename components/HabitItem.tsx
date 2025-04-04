import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '@/.expo/types/Habit';
import Svg from 'react-native-svg';

interface HabitItemProps {
  habit: Habit;
  selectedDate: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HabitItem: React.FC<HabitItemProps> = ({ habit, selectedDate, onToggle, onDelete }) => {
  const dateKey = selectedDate.toISOString().split('T')[0];
  const isCompleted = habit.history?.[dateKey] || false;

  return (
    <View style={[styles.container, { borderLeftColor: habit.color }]}>
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => onToggle(habit.id)}
      >
        <View style={[styles.checkbox, isCompleted && { backgroundColor: habit.color }]}>
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.name}>{habit.name}</Text>
        {habit.description && <Text style={styles.description}>{habit.description}</Text>}
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(habit.id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
    borderLeftWidth: 5,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteText: {
    fontSize: 24,
    color: '#F44336',
    lineHeight: 24,
  },
});