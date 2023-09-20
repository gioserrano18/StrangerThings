import React, { useState, useEffect } from 'react';

const Post = ({ match }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts`);
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [match.params.postId]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>Author: {post.author.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Post;