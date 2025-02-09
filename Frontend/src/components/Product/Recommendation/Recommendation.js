import { useEffect, useState } from "react";
import { api } from "../../../axios";
import './Recommendation.css';

function Recommendation({ productId }) {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        loadProducts().then(res => {
            if (res.data.operation) {
                setProduct(res.data.product.slice(0,4))
            };

        });
    }, [productId]);

    const loadProducts = async () => await api.get(`product/recommendation/${productId}`);

    return (
        <div className="recommendation-container col-sm-5">
            {products?.map((item, index) => (
                <div key={index} className="d-flex flex-row card mt-3 recommendation-card bg-light text-white rounded-3 justify-content-start p-2">
                    <div className="p-1 d-flex justify-content-center align-items-center recommendation-image-container" style={{ minWidth: "30%" }}>
                        <img className="img-fluid rounded recommendation-image" src={item.image[0]} alt={item.name} />
                    </div>
                    <div className="ms-3">
                        <h3 className="fw-bold text-dark card-title">{item.name}</h3>
                        <p className="text-dark">Rs. 
                            <strong className="text-danger text-muted" style={{ textDecoration: "line-through" }}>{item.price}</strong>
                            <strong className="text-success"> {(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</strong>
                        </p>
                        <p className="text-dark">Carbon Footprint: <strong>{item.carbonFootprint}</strong></p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Recommendation;
