import React from 'react'
import { useSearch } from '../Context/SearchContext'
import { Link } from "react-router-dom";


const SearchProduct = () => {
  const { values, setValues } = useSearch();
  return (
    <>
      <div className="container mt-7">
        <div className="text-center">
          <h5>Search Result</h5>
          <p>Total Products found are {values?.result?.length}</p>
          <div className="product-container">
            {values && values.result.length ?
              values.result.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className="product-img" />
                  <div className="product-details">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="product-description">{product.description.substr(0, 50)}</p>
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
    </>
  )
}

export default SearchProduct
