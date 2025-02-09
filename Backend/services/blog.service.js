import { Blog } from '../models/blog.model.js';
//Add new Blog
export const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData);
    return await blog.save();
  } catch (error) {
    console.log('error in creating New Blog', error);
  }
};

//Fetching Blog By Id
export const getBlogById = async () => {
  try {
    return await Blog.findById(blogId)
      .populate('product_id', 'name')
      .populate('user_id', 'name email');
  } catch (error) {
    throw new Error('Error fetching blog: ' + error.message);
  }
};

//Get All Blogs
export const getAllBlogs = async () => {
  try {
    return await Blog.find()
      .populate('product_id', 'name')
      .populate('user_id', 'name email');
  } catch (error) {
    throw new Error('Error fetching blog: ' + error.message);
  }
};

export const updateBlog = async (blogId, updateData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });
    return updatedBlog;
  } catch (error) {
    throw new Error('Error updating blog: ' + error.message);
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    return deletedBlog;
  } catch (error) {
    throw new Error('Error deleting blog: ' + error.message);
  }
};
