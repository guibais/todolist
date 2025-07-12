import './global.css';

import 'react-native-gesture-handler';

import { TodoProvider } from './store/TodoContext';
import Navigation from './navigation';

export default function App() {
  return (
    <TodoProvider>
      <Navigation />
    </TodoProvider>
  );
}
