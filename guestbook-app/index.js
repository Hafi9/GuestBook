const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('guestbook_db', 'postgres', '123456789', {
  host: '127.0.0.1',
  dialect: 'postgres'
});

const Message = sequelize.define('Message', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Create Message
app.post('/messages', async (req, res) => {
  const { name, message } = req.body;
  try {
    const newMessage = await Message.create({ name, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all Messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read single Message
app.get('/messages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Message
app.put('/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;
  try {
    const messageToUpdate = await Message.findByPk(id);
    if (messageToUpdate) {
      messageToUpdate.name = name;
      messageToUpdate.message = message;
      await messageToUpdate.save();
      res.status(200).json(messageToUpdate);
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Message
app.delete('/messages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const messageToDelete = await Message.findByPk(id);
    if (messageToDelete) {
      await messageToDelete.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
