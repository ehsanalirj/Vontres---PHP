import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AIAssistant = () => {
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    // Simulating AI suggestions
    const interval = setInterval(() => {
      const suggestions = [
        "Try asking about their current challenges",
        "Highlight our product's unique selling points",
        "Address any concerns they might have mentioned",
        "Suggest a follow-up meeting to discuss further",
      ];
      setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <Text style={styles.suggestion}>{suggestion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  suggestion: {
    fontSize: 16,
  },
});

export default AIAssistant;