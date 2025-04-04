import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '@/.expo/types/Habit';

const HABITS_KEY = '@habitsTracker:habits';

export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(HABITS_KEY, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar hábitos:', e);
    throw new Error('Falha ao salvar hábitos no armazenamento');
  }
};

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(HABITS_KEY);
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      
      return parsed.map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt),
        history: habit.history || {}
      }));
    }
    return [];
  } catch (e) {
    console.error('Erro ao carregar hábitos:', e);
    throw new Error('Falha ao carregar hábitos do armazenamento');
  }
};

export const addHabit = async (habit: Habit): Promise<void> => {
  const habits = await loadHabits();
  habits.push(habit);
  await saveHabits(habits);
};

export const updateHabit = async (updatedHabit: Habit): Promise<void> => {
  const habits = await loadHabits();
  const index = habits.findIndex(h => h.id === updatedHabit.id);
  if (index !== -1) {
    habits[index] = updatedHabit;
    await saveHabits(habits);
  }
};

export const deleteHabit = async (id: string): Promise<void> => {
  const habits = await loadHabits();
  const filteredHabits = habits.filter(habit => habit.id !== id);
  await saveHabits(filteredHabits);
};

export const toggleHabitForDate = async (
  habitId: string, 
  date: Date
): Promise<Habit | null> => {
  const habits = await loadHabits();
  const habitIndex = habits.findIndex(h => h.id === habitId);
  
  if (habitIndex === -1) return null;
  
  const dateKey = date.toISOString().split('T')[0];
  const updatedHabit = {
    ...habits[habitIndex],
    history: {
      ...habits[habitIndex].history,
      [dateKey]: !habits[habitIndex].history?.[dateKey]
    }
  };
  
  habits[habitIndex] = updatedHabit;
  await saveHabits(habits);
  return updatedHabit;
};