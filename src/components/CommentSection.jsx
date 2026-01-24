import React, { useState } from 'react';
import styles from './CommentSection.module.css';

export default function CommentSection({ comments = [], onAddComment, user }) {
  const [name, setName] = useState(user?.name || '');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || (!user && !name.trim())) return;
    onAddComment({
      name: user?.name || name,
      text,
      date: new Date().toISOString(),
      avatar: user?.avatar || null,
    });
    setText('');
    if (!user) setName('');
  };

  return (
    <section className={styles.commentSection}>
      <h2 className={styles.heading}>Comments</h2>
      <ul className={styles.commentList}>
        {comments.length === 0 && <li className={styles.empty}>No comments yet.</li>}
        {comments.map((c, i) => (
          <li key={i} className={styles.comment}>
            {c.avatar && <img src={c.avatar} alt={c.name} className={styles.avatar} />}
            <div className={styles.commentBody}>
              <div className={styles.commentMeta}>
                <span className={styles.commentName}>{c.name}</span>
                <span className={styles.commentDate}>{new Date(c.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              <div className={styles.commentText}>{c.text}</div>
            </div>
          </li>
        ))}
      </ul>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!user && (
          <div className={styles.formGroup}>
            <label htmlFor="comment-name">Name</label>
            <input
              id="comment-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="comment-text">Comment</label>
          <textarea
            id="comment-text"
            value={text}
            onChange={e => setText(e.target.value)}
            required
            rows={3}
          />
        </div>
        <button className={styles.submitButton} type="submit">Add Comment</button>
      </form>
    </section>
  );
}
