import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params?.slug}`);
            // console.log(data);
            if (data?.product) {
                setProduct(data.product);
                console.log(product);
            }
        } catch (error) {
            console.log(error);
            toast.error("Internal server error")
        }
    }

    useEffect(() => {
        if (params?.slug) getProducts();
    }, [])

    return (
        <div className="container mt-5">
            {product && product._id && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="card-img-top" />
                            <div className="card-body">
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
        </div>
    )
}

export default ProductDetails
