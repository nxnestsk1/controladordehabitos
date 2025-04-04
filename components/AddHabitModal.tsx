import Svg from 'react-native-svg';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { Habit } from '@/.expo/types/Habit';

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAddHabit: (habit: Habit) => void;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ 
  visible, 
  onClose, 
  onAddHabit 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#4CAF50');
  const [icon, setIcon] = useState('✅');

  const handleAddHabit = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome para o hábito');
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      color,
      icon,
      createdAt: new Date(),
      history: {}
    };

    onAddHabit(newHabit);
    setName('');
    setDescription('');
    setColor('#4CAF50');
    setIcon('✅');
    onClose(); // Fechar o modal após adicionar
  };

  const colorOptions = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionar Novo Hábito</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do hábito*"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Descrição (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#999"
          />
          
          <Text style={styles.sectionTitle}>Cor do hábito:</Text>
          <View style={styles.colorContainer}>
            {colorOptions.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorOption, 
                  { backgroundColor: c },
                  color === c && styles.selectedColor
                ]}
                onPress={() => setColor(c)}
              />
            ))}
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.addButton]} 
              onPress={handleAddHabit}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});