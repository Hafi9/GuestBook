import React, { useState } from 'react';
import axios from 'axios';
import './MessageForm.css';

const MessageForm = ({ onMessageAdded }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/messages', { name, message });
      onMessageAdded(response.data);
      setName('');
      setMessage('');
    } catch (error) {
      console.error('There was an error adding the message!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      </div>
      <button type="submit">Add Message</button>
    </form>
  );
};

export default MessageForm;
