import { blogservice } from "../services/blog.service.js";

export const addBlog = async (request, response) => {
    try {
        if (!request.user || (request.user.role !== 'admin' && request.user.role !== 'vendor')) {
            return response.status(403).json({ message: "Access Denied" });
        }

        const author = request.body;
        if (!author) {
            return response.status(400).json({ message: "Author Required" });
        }

        const newBlog = await blogservice.createBlog(request.body);
        response.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const fetchAllBlogs = async (req, res) => {
    try {
        const blogs = await blogservice.getAllBlogs();
        res.status(200).json({ message: 'Blogs fetched successfully', blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await blogservice.getBlogById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }
        res.status(200).json({ message: "Blog Found Successfully", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { blogId} = req.params;
        const updateData = req.body;

        if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'vendor')) {
            return res.status(403).json({ message: 'Authority access required' });
        }

        const updatedBlog = await blogservice.updateBlog(blogId, updateData);

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlogs = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'vendor')) {
            return res.status(403).json({ message: 'Authority access required' });
        }

        const deletedBlog = await blogservice.deleteBlog(blogId);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
