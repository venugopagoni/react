import BlogPostItem from './blogPostItem';
import styles from './blogPostList.module.css';

export default function BlogPostList({ posts, searchQuery }) {
  if (!posts.length) {
    return <p className={styles.empty} aria-live="polite">No posts found.</p>;
  }

  return (
    <div className={styles.list}>
      {posts.map(post => (
        <BlogPostItem key={post.id} post={post} searchQuery={searchQuery} />
      ))}
    </div>
  );
}

