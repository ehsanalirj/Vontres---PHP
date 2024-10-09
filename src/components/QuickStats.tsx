import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuickStats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Icon name="call" size={24} color="#007AFF" />
        <Text style={styles.statValue}>45</Text>
        <Text style={styles.statLabel}>Calls Today</Text>
      </View>
      <View style={styles.statItem}>
        <Icon name="timer" size={24} color="#4CAF50" />
        <Text style={styles.statValue}>3:45</Text>
        <Text style={styles.statLabel}>Avg Duration</Text>
      </View>
      <View style={styles.statItem}>
        <Icon name="star" size={24} color="#FFC107" />
        <Text style={styles.statValue}>4.8</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default QuickStats;