import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MotiView } from 'moti';
import { TodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

export default function Modal() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const { addTask } = useContext(TodoContext);
  const navigation = useNavigation();

  const handleAddTask = async () => {
    if (text.trim()) {
      setLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + 10;
          }
          return prev;
        });
      }, 100);

      try {
        await addTask(text);
        clearInterval(interval);
        setProgress(100);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setSuccess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500); // Show success animation for 1.5 seconds
      } catch (error) {
        console.error('Error adding task:', error);
        clearInterval(interval);
        setLoading(false);
        setProgress(0);
      }
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
          style={{ borderRadius: 15, overflow: 'hidden' }}
          className="w-full md:mx-auto md:max-w-md">
          <View className="p-5">
            {loading ? (
              <View className="items-center justify-center py-10">
                <Text className="mb-4 text-lg text-white">Adicionando tarefa...</Text>
                <View className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <MotiView
                    from={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'timing', duration: 100, easing: Easing.linear }}
                    className="h-full bg-purple-500"
                  />
                </View>
              </View>
            ) : success ? (
              <MotiView
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  damping: 10,
                  stiffness: 100,
                  mass: 1,
                  delay: 200,
                }}
                className="items-center justify-center py-10">
                <MotiView
                  from={{ scale: 0, rotate: '0deg' }}
                  animate={{ scale: 1, rotate: '360deg' }}
                  transition={{
                    type: 'spring',
                    damping: 10,
                    stiffness: 100,
                    mass: 1,
                  }}>
                  <Ionicons name="checkmark-circle" size={80} color="#10B981" />
                </MotiView>
                <Text className="mt-4 text-2xl font-bold text-white">Sucesso!</Text>
              </MotiView>
            ) : (
              <>
                <Text className="mb-5 text-center text-2xl font-bold text-white">Nova Tarefa</Text>
                <Input
                  placeholder="Ex: Estudar React Native"
                  value={text}
                  onChangeText={(newText) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setText(newText);
                  }}
                />
                <Button title="Adicionar" onPress={handleAddTask} />
              </>
            )}
          </View>
        </BlurView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
