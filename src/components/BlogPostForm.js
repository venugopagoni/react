import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date || '');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.content || '');
    setAuthor(post?.author || '');
    setDate(post?.date || '');
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, content, author, date });
      // Optionally reset form here
      // setTitle(''); setContent(''); setAuthor(''); setDate('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          className={errors.title ? styles.inputError : ''}
        />
        {errors.title && <p id="title-error" className={styles.error} role="alert">{errors.title}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : undefined}
          className={errors.content ? styles.inputError : ''}
          rows={6}
        />
        {errors.content && <p id="content-error" className={styles.error} role="alert">{errors.content}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? 'author-error' : undefined}
          className={errors.author ? styles.inputError : ''}
        />
        {errors.author && <p id="author-error" className={styles.error} role="alert">{errors.author}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Publication Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? 'date-error' : undefined}
          className={errors.date ? styles.inputError : ''}
        />
        {errors.date && <p id="date-error" className={styles.error} role="alert">{errors.date}</p>}
      </div>
      <div className={styles.buttonRow}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
