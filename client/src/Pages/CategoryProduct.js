import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    let params = useParams();

    // const getTotal = async () => {
    //     const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
    //     setTotal(data?.total);
    // }  

    // const loadMore = async () => {
    //     const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
    //     if (data?.success) {
    //         setProduct(prevProducts => [...prevProducts, ...data.products]);
    //     }
    // }

    // useEffect(() => {
    //     if (page === 1){
    //         console.log(params.slug);
    //         return;
    //     } 
    //     loadMore();
    // }, [page])

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/products-category-wise/${params.slug}`);
            setProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
        // getTotal();
    }, [params.slug]);

    return (
        <div>
            <div className="container">
                <h3 className="text-center">{`Total Products - ${products.length}`}</h3>
                <div className="product-container">
                    {products.length ?
                        products.map((product) => (
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
                        )) :
                        <h3>No products to display</h3>
                    }
                </div>
                {/* <div className="pagination">
                    {products.length && (
                        <button type="button" className="btn btn-warning" onClick={
                            (e) => {
                                e.preventDefault();
                                setPage(prevPage => prevPage + 1);
                            }}>Loadmore</button>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default CategoryProduct
