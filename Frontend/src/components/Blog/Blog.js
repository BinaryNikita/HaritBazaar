import React, { useState, useEffect } from 'react';
import { api } from '../../axios'; // Assuming your axios instance is configured

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    user_id: '',
    images: '',
    videos: '',
    comments: '',
    author: '',
    tags: '',
    rating: '',
    isActive: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs/all-blogs');
      setBlogs(response.data.blogs);
    } catch (err) {
      setError('Failed to fetch blogs');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle blog submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/blogs/add-blog', formData);
      setSuccess(response.data.message);
      setError('');
      fetchBlogs(); // Refresh blogs
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
      setSuccess('');
    }
  };

  // Delete a blog
  const handleDelete = async (blogId) => {
    try {
      const response = await api.delete(`/blogs/${blogId}`);
      setSuccess(response.data.message);
      setError('');
      fetchBlogs(); // Refresh blogs
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete blog');
      setSuccess('');
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="blog-manager">
      <h1>Blog Manager</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {/* Add Blog Form */}
      <form onSubmit={handleSubmit} className="blog-form">
        <h2>Create a New Blog</h2>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Images (comma-separated URLs):</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Videos (comma-separated URLs):</label>
          <input
            type="text"
            name="videos"
            value={formData.videos}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-submit">
          Add Blog
        </button>
      </form>

      {/* Display Blogs */}
      <div className="blog-list">
        <h2>All Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <h3>{blog.author}</h3>
            <p>{blog.comments}</p>
            <p>
              Tags: {blog.tags?.join(', ')} | Rating: {blog.rating}
            </p>
            <p>Published: {new Date(blog.publishedDate).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(blog._id)} className="btn-delete">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
