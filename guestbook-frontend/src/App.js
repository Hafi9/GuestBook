import React, { useState } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="container">
      <h1>Guest Book</h1>
      <MessageForm onMessageAdded={handleNewMessage} />
      <MessageList messages={messages} />
    </div>
  );
};

export default App;
