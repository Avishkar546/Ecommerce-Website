import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import { useAuth } from '../Context/AuthContext'
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = ({ title, description }) => {

  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProduct] = useState([]);

  const getAllCategories = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/category/get-all-categories");
    setCategories(data);
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
    getAllCategories();
  }, [])

  return (

    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce App - Home</title>
        <meta name="description" content={description} />
        <meta name="keyword" content='Shopping, Ecommerce, Product, Purchase, Shopify, Buying, Mobiles, Shirt, Electronics, Clothes, Pants, T-Shirt'></meta>
      </ Helmet>
      <div className="row m-3">

        <div className="col-md-3">
          <h5>filter By Categories</h5>
          {categories.map((category) => (
            // console.log(category)
            <p>{category.name}</p>
          ))}
        </div>

        <div className="col-md-9">
          <h3 className="text-center"> All Product List </h3>
          <div className="product-container">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="product-img" />
                <div className="product-details">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/products/${product.slug}`} className="btn btn-primary ms-2">View Details</Link>
                  <Link to={`/products/${product.slug}`} className="btn btn-secondary ms-2">ADD TO CART</Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage
