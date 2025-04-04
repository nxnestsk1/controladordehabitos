import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function WeeklyChallengeScreen() {
  const [challenges, setChallenges] = useState([
    { id: '1', name: '5km de Caminhada', completed: true },
    { id: '2', name: 'Alongamento Diário', completed: false },
    { id: '3', name: 'Beber 2L de Água', completed: true },
    { id: '4', name: 'Dormir 8h', completed: false },
    { id: '5', name: 'Treino de Força', completed: false },
  ]);

  const progress = challenges.filter(c => c.completed).length / challenges.length;

  const toggleChallenge = (id: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === id 
          ? { ...challenge, completed: !challenge.completed } 
          : challenge
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafio da Semana</Text>
      
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={progress} 
          color="#4CAF50" 
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% Completo
        </Text>
      </View>

      <View style={styles.challengesContainer}>
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeItem}>
            <Text style={[
              styles.challengeText,
              challenge.completed && styles.completedChallenge
            ]}>
              {challenge.completed ? '✓ ' : '○ '}{challenge.name}
            </Text>
            
            <TouchableOpacity
              style={[
                styles.checkButton,
                challenge.completed && styles.checkedButton
              ]}
              onPress={() => toggleChallenge(challenge.id)}
            >
              <Text style={styles.checkButtonText}>
                {challenge.completed ? '✔' : '+'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E9ECEF',
  },
  progressText: {
    marginTop: 8,
    color: '#6C757D',
    textAlign: 'center',
  },
  challengesContainer: {
    marginBottom: 24,
  },
  challengeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  challengeText: {
    fontSize: 16,
    color: '#333',
  },
  completedChallenge: {
    color: '#6C757D',
    textDecorationLine: 'line-through',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedButton: {
    backgroundColor: '#4CAF50',
  },
  checkButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rewardsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  rewardItem: {
    fontSize: 16,
    color: '#333',
    marginVertical: 6,
  },
});