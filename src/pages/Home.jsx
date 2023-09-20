import React, { useState, useEffect } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Author: {post.author.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;