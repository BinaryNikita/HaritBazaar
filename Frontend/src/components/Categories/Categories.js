import { useEffect, useState } from "react";
import { api } from "../../axios";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData().then(response => {
            setCategories(response.data.category);
        });
    }, []);

    const fetchData = async () => await getCategories();
    const getCategories = async () => await api.get("/category/get-all");


    return (
        <div className="container-fluid my-4 m-0">
            <div className="text-center p-2">
                <h2 className="fw-bold text-success eco-cate-title">Categories</h2>
            </div>
            <div className="row cate-row d-flex flex-nowrap flex-row">
                {categories.map((category, index) => (
                    <div onClick={()=>navigate("/product/all-products",{state: {selectedCategory: category.categoryName}})} key={index} className="eco-category-box col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center">
                        <h4 className="eco-category-name fw-bold text-dark">{category.categoryName}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;
