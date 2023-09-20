import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Assume you have a way to get the authenticated user, e.g., from context or state management.
    const authenticatedUser = { username: 'exampleUser' };

    setUser(authenticatedUser);
    fetchUserPosts(authenticatedUser.username);
  }, []);

  const fetchUserPosts = async (username) => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/users/${username}/posts`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  }

  return (
    <div>
      <h2>User Profile</h2>
      <h3>Welcome, {user && user.username}!</h3>

      <h4>Your Posts</h4>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;