import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { TodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function Modal() {
  const [text, setText] = useState('');
  const { addTask } = useContext(TodoContext);
  const navigation = useNavigation();

  const handleAddTask = async () => {
    if (text.trim()) {
      await addTask(text);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1 items-center justify-center p-5">
        <BlurView
          intensity={40}
          tint="dark"
          style={{ borderRadius: 15, overflow: 'hidden', width: '100%' }}>
          <View className="p-5">
            <Text className="mb-5 text-center text-2xl font-bold text-white">Nova Tarefa</Text>
            <Input
              placeholder="Ex: Estudar React Native"
              value={text}
              onChangeText={(newText) => {
                setText(newText);
              }}
            />
            <Button title="Adicionar" onPress={handleAddTask} />
          </View>
        </BlurView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
