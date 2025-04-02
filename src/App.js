import React from 'react';
import Chat from './components/Chat';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>CoupleGPT (GPT-4 Connected)</h1>
      <Chat />
    </div>
  );
}

export default App;