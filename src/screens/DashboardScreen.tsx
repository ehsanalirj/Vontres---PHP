import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import QuickStats from '../components/QuickStats';
import RecentCalls from '../components/RecentCalls';

const DashboardScreen = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name}</Text>
      <QuickStats />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Call')}>
          <Icon name="call" size={24} color="white" />
          <Text style={styles.actionText}>New Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Analytics')}>
          <Icon name="insert-chart" size={24} color="white" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
      </View>
      <RecentCalls />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 5,
  },
});

export default DashboardScreen;