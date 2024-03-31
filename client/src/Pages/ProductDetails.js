import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProducts] = useState([]);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params?.slug}`);
            setProduct(data?.product);
            console.log(data);
            getRelatedProducts(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
            toast.error("Internal server error")
        }
    }

    const getRelatedProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) getProducts();
    }, [])

    return (
        <div className="container mt-5">
            {product && product._id && (
                <div className="row justify-content-center" style={{ height: "350px" }}>
                    <div className="col-md-6" style={{ width: "40%" }}>
                        <div className="card"
                            style={{ width: '100%', maxWidth: '300px', boxShadow: "2px 2px 8px #c2acac" }}>
                            <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                                alt={product.name}
                                className="card-img-top mx-auto"
                                style={{ height: '200px', objectFit: 'contain' }} >
                            </img>
                            <div className="card-body text-center">
                                <h5 className="card-title">Price: ${product.price}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Description: {product.description}</p>
                                <p className="card-text">Category: {product.category.name}</p>
                                <p className="card-text">Quantity: {product.quantity}</p>
                                <p className="card-text">Shipping: {product.shipping ? 'Available' : 'Not Available'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* <h3 className="text-center"> All Product List </h3> */}
            <div className="product-container">
                {relatedProduct.length && (
                    relatedProduct.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="product-img" />
                            <div className="product-details">
                                <h5 className="product-name">{product.name}</h5>
                                <p className="product-description">{product.description.substr(0, 50)}</p>
                                <p className="product-price">${product.price}</p>
                                <Link to={`/product-details/${product.slug}`} className="btn btn-primary ms-2">View Details</Link>
                                <Link to={`/products/${product.slug}`} className="btn btn-secondary ms-2">ADD TO CART</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ProductDetails
