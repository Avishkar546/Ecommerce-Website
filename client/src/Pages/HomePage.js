import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio, Space } from 'antd';
import { Prices } from "../Components/Prices";
import { toast } from "react-toastify";

const HomePage = ({ title, description }) => {

  const [categories, setCategories] = useState([]);
  const [products, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");

  const getAllCategories = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/category/get-all-categories");
    setCategories(data);
  }

  const getAllProduct = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/product/get-all-products", {
    })

    if (data?.success) {
      setProduct(data.products);
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id)
    }

    setChecked(all);
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length])

  useEffect(() => {
    getAllCategories();
  }, [])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked.length, radio])

  // Function to filter products
  const filterProduct = async () => {
    try {
      console.log(`category : ${checked}, Price : ${radio}`);
      const { data } = await axios.post("http://localhost:8080/api/v1/product/filter-product", { checked, radio });
      if (data) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  }

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
          <div className="d-flex flex-column">
            {categories.map((category) => (
              <Checkbox onChange={(e) => handleFilter(e.target.checked, category._id)}>{category.name}</Checkbox>
            ))}
          </div>

          {/* Price filter  */}
          <h5 className="mt-4">filter By Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              <Space direction="vertical">
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>

        <div className="col-md-9">
          <h3 className="text-center"> All Product List </h3>
          <div className="product-container">
          {products.length? 
              products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="product-img" />
                <div className="product-details">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-description">{product.description.substr(0,50)}</p>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/products/${product.slug}`} className="btn btn-primary ms-2">View Details</Link>
                  <Link to={`/products/${product.slug}`} className="btn btn-secondary ms-2">ADD TO CART</Link>
                </div>
              </div>
            )) : 
              <h3>No products to display</h3>
            }
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage
