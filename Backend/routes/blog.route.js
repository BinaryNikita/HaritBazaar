import express from "express";
import { addBlog, fetchAllBlogs, fetchBlogById, updateBlog,  } from "../controller/blog.controller";
import { deleteBlog } from "../services/blog.service";
const route = express.Router();

route.post("/add-blog", addBlog);
route.get("/all-blogs", fetchAllBlogs);
route.get("/:blogId", fetchBlogById);
route.put('/:blogId', updateBlog);
route.delete('/:blogId', deleteBlog);

export default route;