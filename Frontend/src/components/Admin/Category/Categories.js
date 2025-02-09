import { useEffect, useRef, useState } from "react";
import { api } from "../../../axios";
import AdminHeader from "../AdminHeader.js/AdminHeader";
import './Categories.css';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [err, SetErr] = useState(false);
    const [delErr, SetDelErr] = useState(false);
    const categoryName = useRef();

    const getCategories = async () => await api.get('/category/get-all', { headers: { Authorization: localStorage.getItem('token') } });

    useEffect(() => {
        getCategories().then(response => setCategories(response.data.category));
    }, []);

    useEffect(() => {
        console.log("re-render");
    }, [categories]);

    const addCategory = (event) => {
        event.preventDefault();
        sendData().then(response => {
            if (response.data.operation) {
                getCategories().then(response => setCategories(response.data.category));
                categoryName.current.value = "";
                SetErr(false);
            } else {
                SetErr(response.data.msg);
            }
        }).catch(err => {
            console.log(err);
            console.log("Category/ Categories File");
        });
    };

    const sendData = async () => await api.post("/category/create-category", { categoryName: categoryName.current.value }, { headers: { Authorization: localStorage.getItem('token') } });

    const deleteCategory = (id) => {
        console.log(id);
        deleteRequest(id).then(response => {
            console.log(response.data);
            if (response.data.operation) {
                getCategories().then(response => {
                    setCategories(response.data.category);
                    SetDelErr(false);
                });
            } else {
                SetDelErr(response.data.msg);
            }
        });
    };

    const deleteRequest = async (id) => await api.delete(`/category/${id}`, { headers: { Authorization: localStorage.getItem('token') } });

    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <form onSubmit={addCategory}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input ref={categoryName} type="text" className="form-control" id="categoryName" placeholder="Enter category name" required />
                        <small className="text-danger">{err}</small>
                    </div>
                    <button type="submit" className="btn btn-success">Add Category</button>
                </form>
            </div>
            <div className="container mt-5">
                <h2>Category List</h2>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Category Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td><button onClick={() => deleteCategory(category._id)} className="btn btn-outline-danger">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <small className="text-danger">{delErr}</small>
            </div>
        </>
    );
}

export default Categories;
