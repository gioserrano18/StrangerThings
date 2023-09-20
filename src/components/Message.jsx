import React from 'react';

const Message = ({ message, currentUser }) => {
  return (
    <li>
      <p>From: {message.fromUser.username}</p>
      <p>{message.content}</p>
      {currentUser && currentUser.username !== message.fromUser.username && (
        <button>Reply</button>
      )}
    </li>
  );
}

export default Message;