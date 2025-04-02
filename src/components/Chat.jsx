import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // ✅ DEBUG: Check if the API key is available at runtime
    console.log('Using API key:', process.env.REACT_APP_OPENAI_API_KEY);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: newMessages,
        }),
      });

      const data = await res.json();

      // ✅ DEBUG: Log the full OpenAI API response
      console.log('OpenAI response:', data);

      if (!res.ok) {
        console.error('OpenAI error:', data);
        throw new Error(data.error?.message || 'Unknown error from OpenAI');
      }

      const reply = data.choices?.[0]?.message?.content || '[No reply]';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Fetch error:', err);
      setMessages([...newMessages, { role: 'assistant', content: '[Error fetching reply]' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.role === 'user' ? 'You' : 'CoupleGPT'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div
