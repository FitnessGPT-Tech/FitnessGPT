import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  // Initialize with a welcome message from FitnessGPT
  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! I’m FitnessGPT. How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'FitnessGPT',
          avatar: 'https://placeimg.com/140/140/any', // Avatar for FitnessGPT
        },
      },
    ]);
  }, []);

  // Send the message to the backend
  const onSend = useCallback(async (messages = []) => {
    const userMessage = messages[0].text;

    // Display user message in chat first
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    // Send the message to FitnessGPT backend API
    try {
      const response = await fetch('http://localhost:3000/api/fitnessgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // Add FitnessGPT's response to the chat
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: Math.random(),
          text: data.reply,
          createdAt: new Date(),
          user: {
            _id: 2, // FitnessGPT ID
            name: 'FitnessGPT',
            avatar: 'https://placeimg.com/140/140/any',
          },
        })
      );
    } catch (error) {
      console.error('Error connecting to FitnessGPT backend:', error);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1, // Your user ID
      }}
      placeholder="Type your message here..."
      showUserAvatar={true}
    />
  );
}
