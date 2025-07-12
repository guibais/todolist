
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { TodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

export default function Home() {
  const { tasks, toggleTask, clearCompleted } = useContext(TodoContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 p-5">
        <Text className="text-4xl font-bold text-white mb-5">Suas Tarefas</Text>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleTask(item.id)} className="mb-3">
              <BlurView intensity={40} tint="dark" style={{ borderRadius: 15, overflow: 'hidden' }}>
                <View className={`p-4 border-l-4 ${item.completed ? 'border-green-500' : 'border-purple-500'}`}>
                  <Text className={`text-lg text-white ${item.completed ? 'line-through' : ''}`}>
                    {item.text}
                  </Text>
                </View>
              </BlurView>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-20">
              <Text className="text-lg text-gray-400">Nenhuma tarefa ainda.</Text>
            </View>
          )}
        />
        <View className="mt-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('Modal')}
            className="bg-purple-600 py-4 rounded-lg mb-3"
          >
            <Text className="text-white text-center text-lg font-bold">Adicionar Tarefa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearCompleted}
            className="bg-red-500 py-4 rounded-lg"
          >
            <Text className="text-white text-center text-lg font-bold">Limpar Concluídas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
