import React, { useState, useEffect } from 'react';

const MessageList = ({ postId, currentUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts/messages`);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, [postId]);

  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {messages.map(message => (
          <Message key={message._id} message={message} currentUser={currentUser} />
        ))}
      </ul>
    </div>
  );
}

export default MessageList;