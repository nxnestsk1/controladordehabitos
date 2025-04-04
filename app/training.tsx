import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ExternalPathString, useRouter } from 'expo-router';
import React from 'react';

interface Workout {
  id: string;
  name: string;
  duration: number;
  difficulty: string;
  exercises: string[];
}

const WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Treino de Força Completo',
    duration: 45,
    difficulty: 'Intermediário',
    exercises: ['Supino Reto', 'Agachamento Livre', 'Remada Curvada', 'Desenvolvimento Militar']
  },
  {
    id: '2',
    name: 'Treino Cardiovascular',
    duration: 30,
    difficulty: 'Iniciante',
    exercises: ['Esteira', 'Bicicleta Ergométrica', 'Corda Naval']
  },
  {
    id: '3',
    name: 'Treino de Resistência',
    duration: 40,
    difficulty: 'Avançado',
    exercises: ['Burpee', 'Flexão Diamante', 'Pular Corda', 'Mountain Climber']
  }
];

export default function TrainingScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/workout-detail/${item.id}` as ExternalPathString)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDifficulty}>{item.difficulty}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.durationText}>{item.duration} minutos</Text>
        <View style={styles.exercisesContainer}>
          {item.exercises.slice(0, 3).map((exercise, index) => (
            <Text key={index} style={styles.exerciseText}>
              • {exercise}
            </Text>
          ))}
          {item.exercises.length > 3 && (
            <Text style={styles.moreExercises}>+ {item.exercises.length - 3} exercícios</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2d3436" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Programas de Treino</Text>
      
      <FlatList
        data={WORKOUTS}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum treino disponível</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    flex: 1,
  },
  cardDifficulty: {
    fontSize: 14,
    fontWeight: '500',
    color: '#636e72',
    backgroundColor: '#f0f2f5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  cardBody: {
    paddingLeft: 8,
  },
  durationText: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 8,
  },
  exercisesContainer: {
    gap: 4,
  },
  exerciseText: {
    fontSize: 14,
    color: '#2d3436',
  },
  moreExercises: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#636e72',
    marginTop: 24,
    fontSize: 16,
  },
});