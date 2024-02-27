import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setMessages([...messages, { text: trimmedQuery, isUser: true }]);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: trimmedQuery }),
      });
      const data = await response.json();
      setMessages([...messages, { text: trimmedQuery, isUser: true }, { text: data.response, isUser: false }]);
      setQuery('');
    }
  };

  return (
    <div>
      {/* Messages display */}
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      {/* Message input */}
      <form onSubmit={sendMessage}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
