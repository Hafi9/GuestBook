import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MessageList.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('There was an error fetching the messages!', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Guest Book Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.name}:</strong> {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
