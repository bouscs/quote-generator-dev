import { SubscribeDevProvider } from '@subscribe.dev/react';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css';

function App() {
  return (
    <SubscribeDevProvider projectToken={import.meta.env.VITE_SUBSCRIBE_DEV_PROJECT_TOKEN}>
      <QuoteGenerator />
    </SubscribeDevProvider>
  );
}

export default App;