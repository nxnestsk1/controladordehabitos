import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressChartProps {
  progress: number;
  date: Date;
  onDateChange: (date: Date) => void;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ 
  progress, 
  date, 
  onDateChange 
}) => {
  // Configurações do círculo de progresso
  const size = 200;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress * circumference);

  // Função para formatar a data em português
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    
    return date.toLocaleDateString('pt-BR', options)
      .replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
  };

  // Funções para manipulação de datas
  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    onDateChange(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity 
          onPress={() => changeDate(-1)}
          style={styles.dateButtonContainer}
        >
          <Text style={styles.dateButton}>〈</Text>
        </TouchableOpacity>
        
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        
        <TouchableOpacity 
          onPress={() => changeDate(1)}
          style={styles.dateButtonContainer}
          disabled={date >= new Date()}
        >
          <Text style={[styles.dateButton, date >= new Date() && styles.disabledButton]}>〉</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          <Circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="#4A90E2"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size/2}, ${size/2}`}
          />
        </Svg>
        
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>
            {(progress * 100).toFixed(0)}%
          </Text>
          <Text style={styles.progressSubText}>Concluído</Text>
        </View>
      </View>
    </View>
  );
};

// Mantenha os mesmos estilos do código anterior
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  dateButtonContainer: {
    padding: 10,
  },
  dateButton: {
    fontSize: 28,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#B0B0B0',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 200,
    color: '#333',
    marginHorizontal: 10,
  },
  chartContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  progressTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  progressSubText: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});