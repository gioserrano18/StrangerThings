import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');

  useEffect(() => {
    const authenticatedUser = { username: 'exampleUser' };

    setUser(authenticatedUser);
    fetchMessages(authenticatedUser.username);
  }, []);

  const fetchMessages = async (username) => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/users/${username}/messages`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPostTitle,
          description: newPostDescription,
        }),
      });

      const data = await response.json();

      if (data.post) {
        setNewPostTitle('');
        setNewPostDescription('');
      }
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <h3>Welcome, {user && user.username}!</h3>

      <h4>Your Messages</h4>
      <ul>
        {messages.map(message => (
          <li key={message._id}>
            <p>From: {message.fromUser.username}</p>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>

      <h4>Create New Post</h4>
      <form onSubmit={handleNewPostSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={newPostDescription} onChange={(e) => setNewPostDescription(e.target.value)} required />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default Profile;