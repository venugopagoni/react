import styles from './blogPostDetail.module.css';
import CommentSection from './CommentSection';
import React, { useState } from 'react';

export default function BlogPostDetail({ post, onDelete }) {
  // Example: comments state, replace with real data/fetch in production
  const [comments, setComments] = useState([]);
  // Example: user, replace with real auth in production
  const user = null; // or { name: 'John Doe', avatar: '...' }

  const handleAddComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  if (!post) return <p className={styles.empty}>Post not found.</p>;

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        By <strong>{post.author}</strong> on {new Date(post.date).toDateString()}
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <button className={styles.deleteButton} onClick={onDelete}>
        Delete
      </button>
      <CommentSection
        comments={comments}
        onAddComment={handleAddComment}
        user={user}
      />
    </article>
  );
}
