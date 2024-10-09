import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OptimizedFlatList from './OptimizedFlatList';

// ... rest of the code remains the same

const RecentCalls = () => {
  // ... existing code

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Calls</Text>
      <OptimizedFlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// ... styles remain the same

export default RecentCalls;