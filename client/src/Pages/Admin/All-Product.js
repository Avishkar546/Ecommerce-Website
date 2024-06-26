import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const AllProduct = () => {
    const [products, setProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const [auth] = useAuth();

    const getTotal = async () => {
        const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
        setTotal(data?.total);
    }

    const getAllProduct = async () => {
        const token = auth.token;
        const { data } = await axios.get("http://localhost:8080/api/v1/product/get-all-products", {
        })

        if (data?.success) {
            setProduct(data.products);
        }
    }

    useEffect(() => {
        getAllProduct();
        getTotal();
    }, [])

    const loadMore = async () => {
        console.log(page);
        const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
        console.log(data);
        if (data?.success) {
            setProduct(prevProducts => [...prevProducts, ...data.products]);
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])

    const handleEditProduct = (productId) => {

    }

    const handleDeleteProduct = async (productId) => {
        const { data } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${productId}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        if (data) {
            setProduct(data.updatedResult);
        }
    }

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
                        {products.length > 0 ? products.map((product) => (
                            <div key={product._id} className="product-card">
                                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="product-img" />
                                <div className="product-details">
                                    <h5 className="product-name">{product.name}</h5>
                                    <p className="product-description">{product.description.substr(0, 50)}...</p>
                                    <p className="product-price">${product.price}</p>
                                    <div className="product-actions">
                                        <Link to={`/products/${product.slug}`} className="btn btn-primary">View Details</Link>
                                        <button className="btn btn-outline-success btn-sm" onClick={() => handleEditProduct(product._id)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProduct(product._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )) : <h2>No products to display</h2>}
                    </div>

                    <div className="pagination">
                        {products.length !== 0 && total > products.length && (
                            <button type="button" className="btn btn-warning" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setPage(prevPage => prevPage + 1);
                                }}>Loadmore
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default AllProduct;
