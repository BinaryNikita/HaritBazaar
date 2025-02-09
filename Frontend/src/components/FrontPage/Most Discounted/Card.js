import { useNavigate } from "react-router-dom";

function Card({ product }) {
    const navigate = useNavigate();
    return (
        <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="product-card-c-f">
            <div className="img-container-c-f">
                <img
                    src={product.image[0]}
                    className="card-img-top"
                    alt={product.name}
                />
            </div>
            <div className="d-flex flex-column mt-2 align-items-center">
                <h5 className="card-title p-0 m-0">{product.name}</h5>
                <p className="card-text p-0 m-0"><strong className="text-success">Rs.</strong> {product.price.toFixed(2)}</p>
                <p className="card-text p-0 m-0"><strong className="text-success">Discount: </strong> {product.discount}</p>
                {product.onSale && <div className="sale-badge">{product.saleText}</div>}
            </div>
        </div>
    );
}

export default Card;