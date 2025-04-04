import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function HealthTipsScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const tips = [
    {
      id: '1',
      category: 'Hidratação',
      title: 'Água é Vida',
      content: 'Beba pelo menos 8 copos de água por dia. Mantenha uma garrafa sempre à mão para facilitar a hidratação constante.',
    },
    {
      id: '2',
      category: 'Sono',
      title: 'Qualidade do Sono',
      content: 'Mantenha um horário regular de sono. Evite telas 1 hora antes de dormir e crie um ambiente escuro e silencioso.',
    },
    {
      id: '3',
      category: 'Nutrição',
      title: 'Alimentação Balanceada',
      content: 'Inclua vegetais em todas as refeições. Prefira alimentos integrais e reduza o consumo de processados.',
    },
  ];

  const toggleFavorite = (tipId: string) => {
    setFavorites(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId) 
        : [...prev, tipId]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dicas de Saúde</Text>
      
      {tips.map((tip) => (
        <View key={tip.id} style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Text style={styles.category}>{tip.category}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(tip.id)}>
              <Text style={[
                styles.favoriteButton,
                favorites.includes(tip.id) && styles.favorited
              ]}>
                {favorites.includes(tip.id) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipContent}>{tip.content}</Text>
        </View>
      ))}
    </ScrollView>
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
  tipCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  favoriteButton: {
    fontSize: 24,
  },
  favorited: {
    color: '#FF4081',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  moreButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  moreButtonText: {
    color: '#2196F3',
    fontWeight: '600',
  },
});