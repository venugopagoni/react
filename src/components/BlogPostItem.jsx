import styles from './blogPostItem.module.css';
import { Link } from 'react-router-dom';

function highlight(text, query) {
  if (!query) return text;
  const q = query.trim();
  if (!q) return text;
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? <mark key={i} style={{ background: 'yellow', padding: 0 }}>{part}</mark>
      : part
  );
}

export default function BlogPostItem({ post, searchQuery }) {
  return (
    <div className={styles.card}>
      <Link to={`/posts/${post.id}`} className={styles.link}>
        <h2 className={styles.title}>{highlight(post.title, searchQuery)}</h2>
        <p className={styles.summary}>{highlight(post.summary || '', searchQuery)}</p>
        <div className={styles.meta}>
          <span>{post.author}</span> | <span>{new Date(post.date).toDateString()}</span>
        </div>
      </Link>
    </div>
  );
}
