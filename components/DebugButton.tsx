import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DebugButton() {
  const clearTokens = async () => {
    try {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_data']);
      Alert.alert('Success', 'Tokens cleared! Please log in again.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear tokens');
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#ff4444',
        padding: 15,
        margin: 10,
        borderRadius: 8,
        alignItems: 'center',
      }}
      onPress={clearTokens}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        🧹 Clear Tokens (DEBUG)
      </Text>
    </TouchableOpacity>
  );
}
