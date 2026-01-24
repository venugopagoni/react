import React, { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import BlogPostList from './components/BlogPostList'
import BlogPostDetail from './components/blogPostDetails';
import SearchBar from './components/SearchBar';


// Sample blog data (you can move this to a JSON file or API later)
const posts = [
  {
    id: '1',
    title: 'Understanding React',
    summary: 'An introduction to React concepts and architecture.',
    content: '<p>This is the <strong>full content</strong> of Understanding React.</p>',
    author: 'John Doe',
    date: '2024-05-15'
  },
  {
    id: '2',
    title: 'Advanced CSS Tips',
    summary: 'Take your CSS skills to the next level with these tips.',
    content: '<p>This is the <em>complete article</em> on advanced CSS.</p>',
    author: 'Jane Smith',
    date: '2024-05-20'
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    date: '2023-03-10',
    url: '/posts/3',
  },
];


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts by title or content (case-insensitive)
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.trim().toLowerCase();
    return posts.filter(post =>
      (post.title && post.title.toLowerCase().includes(q)) ||
      (post.summary && post.summary.toLowerCase().includes(q)) ||
      (post.content && post.content.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem' }}>
        <SearchBar onSearch={setSearchQuery} />
      </nav>
      <Routes>
        <Route path="/" element={<BlogPostList posts={filteredPosts} searchQuery={searchQuery} />} />
        <Route
          path="/posts/:id"
          element={<BlogPostDetailWrapper posts={posts} />}
        />
      </Routes>
    </div>
  );
}

// A wrapper to find the post by ID from route params
import { useParams } from 'react-router-dom'
function BlogPostDetailWrapper({ posts }) {
  const { id } = useParams()
  const post = posts.find(p => p.id === id)
  return post ? <BlogPostDetail post={post} /> : <p>Post not found.</p>
}

export default App
