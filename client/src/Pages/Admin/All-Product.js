import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
const AllProduct = () => {
    const [products, setProduct] = useState([]);

    const [auth] = useAuth();

    const getAllProduct = async () => {
        const token = auth.token;
        const { data } = await axios.get("http://localhost:8080/api/v1/product/get-all-products", {
        })

        if (data?.success) {
            setProduct(data.products);
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Ecommerce App - Our Products</title>
                <meta name="description" content=" Know About Us - Who We are" />
                <meta
                    name="keyword"
                    content="Shopping, Ecommerce, Product, Purchase, Shopify, Buying, Mobiles, Shirt, Electronics, Clothes, Pants, T-Shirt"
                ></meta>
            </Helmet>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center"> All Product List </h1>
                    <div className="product-container">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="product-img" />
                                <div className="product-details">
                                    <h5 className="product-name">{product.name}</h5>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-price">${product.price}</p>
                                    <Link to={`/products/${product.slug}`} className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default AllProduct;
