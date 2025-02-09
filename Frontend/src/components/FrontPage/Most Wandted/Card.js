import { useNavigate } from "react-router-dom";

function Card({ product }) {
    const navigate = useNavigate();
    return (
        <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="product-card-m-w d-flex flex-column">
            <div className='img-container-m-w'>
                <img
                    src={product.image[0]}
                    className="card-img-top"
                    alt={product.name}
                />
            </div>
            <div className="card-body-m-w d-flex flex-column mt-2 align-items-center">
                <h5 className="card-title p-0 m-0">{product.name}</h5>
                <p className="card-text p-0 m-0">Rs. {product.price.toFixed(2)}</p>
                <p className="card-text p-0 m-0">Views: {product.viewCount}</p>
                {product.onSale && <div className="sale-badge">{product.saleText}</div>}
            </div>
        </div>
    );
}

export default Card;