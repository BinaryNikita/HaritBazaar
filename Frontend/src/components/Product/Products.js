import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import './product.css';
import AddToCartComponent from '../Cart/AddToCart';
import Header from '../FrontPage/Header/Header';
import { Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../FrontPage/Footer';


//  PRODUCT CARD
const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.User.isLoggedIn);

    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            setMessage("You need to sign in first.");
            navigate('/user/sign-in');
            return;
        }

        try {
            const headers = {
                Authorization: localStorage.getItem('token')
            };
            const sendData = async () => await api.post("/cart/add-to-cart", { productId: product._id, quantity }, { headers });

            sendData().then(response => {
                console.log(response.data)
                setMessage(response.data.message || "Added to cart successfully!");
            }).catch(err => {
                setMessage(err.response.data.message || "Failed to add item to cart.");
            });

            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (err) {
            setMessage("Failed to add item to cart. Please try again.");
        }
    };

    return (
        <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card single-new-arrival">
                <div className="card-body single-new-arrival-bg">
                    <img src={product.image[0]} className="card-img-top" alt={product.name} />
                    <div className="single-new-arrival-bg-overlay"></div>
                    <div className="new-arrival-cart d-flex">
                        <p onClick={() => handleAddToCart(product)}>
                            <span className="lnr lnr-cart"></span>
                            <p>add to cart</p>
                        </p>
                        <p onClick={()=>navigate(`/product/${product._id}`)}>
                            <span className="lnr lnr-cart"></span>
                            <p>View more</p>
                        </p>
                    </div>
                </div>
                <p className='text-danger'>{message}</p>
                <h4 className='card-title'>{product.name}</h4>
                <p className="arrival-product-price text-success">Rs. <strong>{(product.price - ((product.price * product.discount) / 100)).toFixed(2)}</strong></p>
            </div>
        </div>
    );
}
    // PRODUCT PAGE
const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('price');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState({});

    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory 

    useEffect(() => {
        if (selectedCategory) {
            setSelectedCategories([selectedCategory]); 
            setAppliedFilters({ selectedCategories: [selectedCategory] });
        }
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/product/all-products');
            if (Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
            }
        } catch (err) {
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        const response = await api.get('/category/get-all');
        if (response.data.success) setCategories(response.data.category);
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handlePriceRangeChange = (min, max) => {
        if (min < 0 || max < 0 || min > 10000 || max > 10000) {
            setErrorMessage("Price range must be between 0 and 10000.");
            return;
        }
        if (min > max) {
            setErrorMessage("Minimum price cannot be greater than maximum price.");
            return;
        }
        setErrorMessage("");
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
    const handleSortChange = (e) => setSortOption(e.target.value);

    const changeFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleCategoryChange = (category, checked) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        }
    };

    const applyFilters = () => {
        setAppliedFilters({
            searchQuery,
            minPrice,
            maxPrice,
            selectedCategories
        });
        changeFilterVisibility();
    };

    const removeFilters = () => {
        setAppliedFilters({});
        setSearchQuery('');
        setMinPrice(0);
        setMaxPrice(10000);
        setSelectedCategories([]);
    };

    const filterAndSortProducts = () => {
        let filtered = products.filter((product) =>
            product.name.toLowerCase().includes(appliedFilters.searchQuery || searchQuery) &&
            (product.price - ((product.price * product.discount) / 100)) >= (appliedFilters.minPrice || minPrice) &&
            (product.price - ((product.price * product.discount) / 100)) <= (appliedFilters.maxPrice || maxPrice)
        );

        if (appliedFilters.selectedCategories && appliedFilters.selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                appliedFilters.selectedCategories.some(category => 
                    product.category_id.categoryName === category || 
                    product.type === category
                )
            );
        }

        return filtered.sort((a, b) => {
            switch (sortOption) {
                case 'price':
                    return a.price - b.price;
                case 'discount':
                    return b.discount - a.discount;
                case 'isOrganic':
                    return a.isOrganic === b.isOrganic ? 0 : a.isOrganic ? -1 : 1;
                case 'isRecycled':
                    return a.isRecycled === b.isRecycled ? 0 : a.isRecycled ? -1 : 1;
                case 'carbonFootprint':
                    return b.carbonFootprint - a.carbonFootprint;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    };

    const retryFetch = () => {
        setLoading(true);
        setError(null);
        fetchProducts();
        fetchCategories();
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" /> Loading...
            </div>
        );

    if (error)
        return (
            <div>
                <div>{error}</div>
                <button className="btn btn-primary" onClick={retryFetch}>Retry</button>
            </div>
        );

    let sortedAndFilteredProducts = filterAndSortProducts();

    return (
        <>
            <Header />
            <div className="container">
                <h1 className="text-center text-success mt-2 mb-2 product-title fw-bold"><strong className='word'>Step</strong> <strong className='word'>towards</strong> <strong className='word'>a</strong> <strong className='word'>sustainable</strong> <strong className='word'>environment</strong></h1>
                <button
                    className="btn btn-primary mb-3"
                    onClick={changeFilterVisibility}
                >
                    {isFilterVisible ? 'Hide Filters' : 'Add Filters'}
                </button>

                {Object.keys(appliedFilters).length > 0 && (
                    <button className="btn btn-danger mb-3" onClick={removeFilters}>
                        Remove Filters
                    </button>
                )}

                {isFilterVisible && (
                    <>
                        <div className="price-range-filter my-3">
                            <label>Price Range: Rs {minPrice} - Rs {maxPrice}</label>
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={minPrice}
                                onChange={(e) => handlePriceRangeChange(e.target.value, maxPrice)}
                                className="form-range"
                            />
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={maxPrice}
                                onChange={(e) => handlePriceRangeChange(minPrice, e.target.value)}
                                className="form-range"
                            />
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        </div>

                        {/* Categories */}
                        <div className="filter-options">
                            <h5>Filter by Categories</h5>
                            <div className="checkbox-group row">
                                {categories.map((category, index) => (
                                    <div className='col-lg-2 d-flex justify-content-start' key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.categoryName)}
                                                onChange={(e) => handleCategoryChange(category.categoryName, e.target.checked)}
                                            />
                                            {category.categoryName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-success my-3" onClick={applyFilters}>Apply Filters</button>
                    </>
                )}

                <div className="d-flex justify-content-between my-3">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <select
                        className="form-select w-auto"
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="price">Sort by Price</option>
                        <option value="discount">Sort by Discount</option>
                        <option value="isOrganic">Sort by Organic</option>
                        <option value="isRecycled">Sort by Recycled</option>
                        <option value="carbonFootprint">Sort by Carbon Footprint</option>
                    </select>
                </div>

                <div className="row">
                    {sortedAndFilteredProducts.length > 0 ? (
                        sortedAndFilteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ProductsPage;
