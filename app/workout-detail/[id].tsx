import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function WorkoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const workoutData = {
    '1': {
      name: 'Treino de Força',
      duration: 45,
      difficulty: 'Intermediário',
      exercises: [
        { name: 'Supino Reto', sets: 4, reps: '8-10' },
        { name: 'Agachamento Livre', sets: 4, reps: '8-10' },
        { name: 'Remada Curvada', sets: 3, reps: '10-12' },
        { name: 'Desenvolvimento Militar', sets: 3, reps: '10-12' }
      ],
      instructions: 'Execute cada exercício com técnica adequada. Mantenha intervalos de 60-90 segundos entre séries.'
    },
    '2': {
      name: 'Treino Cardiovascular',
      duration: 30,
      difficulty: 'Iniciante',
      exercises: [
        { name: 'Esteira', sets: 1, reps: '20 minutos' },
        { name: 'Bicicleta Ergométrica', sets: 1, reps: '15 minutos' },
        { name: 'Corda Naval', sets: 3, reps: '1 minuto' }
      ],
      instructions: 'Mantenha a intensidade moderada durante todo o treino. Hidrate-se adequadamente.'
    }
  };

  const workout = workoutData[id as keyof typeof workoutData];

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Treino não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{workout.name}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Duração: {workout.duration} min</Text>
          <Text style={styles.metaText}>Nível: {workout.difficulty}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exercícios</Text>
        {workout.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseText}>Séries: {exercise.sets}</Text>
              <Text style={styles.exerciseText}>Repetições: {exercise.reps}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instruções</Text>
        <Text style={styles.instructionsText}>{workout.instructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  metaText: {
    fontSize: 16,
    color: '#636e72',
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 16,
  },
  exerciseCard: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
    marginBottom: 8,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseText: {
    fontSize: 14,
    color: '#636e72',
  },
  instructionsText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#636e72',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 24,
  },
});