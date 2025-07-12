
import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { TodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

export default function Modal() {
  const [text, setText] = useState('');
  const { addTask } = useContext(TodoContext);
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className="flex-1 bg-gray-900"
    >
      <SafeAreaView className="flex-1 justify-center items-center p-5">
        <BlurView intensity={40} tint="dark" style={{ borderRadius: 15, overflow: 'hidden', width: '100%' }}>
          <View className="p-5">
            <Text className="text-2xl font-bold text-white mb-5 text-center">Nova Tarefa</Text>
            <TextInput
              className="bg-gray-800 text-white rounded-lg p-4 mb-5"
              placeholder="Ex: Estudar React Native"
              placeholderTextColor="#999"
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity
              onPress={handleAddTask}
              className="bg-purple-600 py-4 rounded-lg"
            >
              <Text className="text-white text-center text-lg font-bold">Adicionar</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
