import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Habit } from '@/.expo/types/Habit';
import { AddHabitModal } from '@/components/AddHabitModal';
import { HabitItem } from '@/components/HabitItem';
import { ProgressChart } from '@/components/ProgressChart';
import { loadHabits, saveHabits } from '@/storage/habitStorage';
import Svg from 'react-native-svg';

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      const loadedHabits = await loadHabits();
      if (loadedHabits) {
        setHabits(loadedHabits);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]);
    setModalVisible(false);
  };

  const toggleHabit = (id: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        const updatedHistory = habit.history || {};
        const dateKey = selectedDate.toISOString().split('T')[0];
        
        return {
          ...habit,
          history: {
            ...updatedHistory,
            [dateKey]: !updatedHistory[dateKey]
          }
        };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const deleteHabit = (id: string) => {
    Alert.alert(
      "Remover os Hábitos",
      "Tem certeza que deseja remover este hábito?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: () => {
            setHabits(habits.filter(habit => habit.id !== id));
          }
        }
      ]
    );
  };

  const calculateCompletionRate = () => {
    if (habits.length === 0) return 0;
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    const completed = habits.filter(habit => habit.history?.[dateKey]).length;
    return completed / habits.length;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Os Meus Hábitos</Text>
      
      <ProgressChart 
        progress={calculateCompletionRate()} 
        date={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem 
            habit={item} 
            selectedDate={selectedDate}
            onToggle={toggleHabit}
            onDelete={deleteHabit}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum hábito foi cadastrado.</Text>
        }
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      <AddHabitModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddHabit={addHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 4,
  },
});