import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();

  const featuredContent = [
    {
      id: '1',
      title: 'Novos Exercícios',
      description: 'Descubra treinos atualizados para sua rotina',
      image: 'https://i.pinimg.com/736x/81/2c/b0/812cb076c66d013a5ee0d6651fc2aa2f.jpg',
      action: () => router.push('/training'),
    },
    {
      id: '2',
      title: 'Desafio da Semana',
      description: 'Complete 5 atividades e ganhe pontos',
      image: 'https://cdn-icons-png.flaticon.com/512/1388/1388262.png',
      action: () => router.push('/challenge'),
    },
    {
      id: '3',
      title: 'Dicas de Saúde',
      description: 'Veja as últimas recomendações dos especialistas',
      image: 'https://w7.pngwing.com/pngs/988/1022/png-transparent-computer-icons-public-health-health-hand-logo-silhouette.png',
      action: () => router.push('/health-tips'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descubra Mais</Text>
      
      <FlatList
        data={featuredContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={item.action}
            activeOpacity={0.7} 
          >
            <Image 
              source={{ uri: item.image }} 
              style={styles.image} 
            />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});