import React, { useState, useEffect } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  // To store all the categories, so that dropdown display it.
  const [categories, setCategories] = useState([]);

  // Need to get the id from search category
  const [searchCategory, setSearchCategory] = useState("");

  // Get logged in user token
  const [auth] = useAuth();

  // Navigate to other page
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "",
    photo: ""
  })

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-all-categories");
      setCategories(data);
    } catch (error) {
      console.error('Failed to create category:', error);
      console.log('Error Response:', error.response);
      toast.error("Internal Server error");
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  const filterOption = (input, option) => {
    // Custom logic for filtering options based on user input
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: newValue }));
  }


  const handleCreateProduct = async (e) => {
    // console.log("Into handleCreateProduct");

    e.preventDefault();
    try {
      const token = auth.token;
      const formData = new FormData();

      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
      formData.append('photo', product.photo);
      formData.append('category', searchCategory);
      formData.append('shipping', product.shipping);

      // formData.forEach((val, key) => {
      //   console.log(`${key} : ${val}`);
      // })

      const { data } = await axios.post("http://localhost:8080/api/v1/product/create-product", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data; boundary=--------------------------boundary',
        }
      },
      )

      console.log(data);
      if (data?.success) {
        toast.success("product created succesfully");
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          shipping: "",
          photo: ""
        })
        navigate('/dashboard/admin/all-products');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1> Manage Product </h1>
          <div className="m-1 w-75">
            <Select
              placeholder="Search a category"
              size='100'
              showSearch
              className='form-select col-md-12'
              style={{ border: '1px solid black', borderRadius: '4px' }} // Adjust border style here
              onChange={(value) => setSearchCategory(value)}
              options={categories?.map((category) => ({ value: category._id, label: category.name }))}
              filterOption={filterOption}
              variant="borderless"
            >
            </Select>

            <div className="mt-3 mb-3">
              <label className='btn btn-outline-secondary col-md-12'>
                {product.photo ? product.photo.name : "Upload image"}
                <input type="file" name="photo" accept='image/*' onChange={(e) => setProduct({ ...product, photo: e.target.files[0] })} hidden />
              </label>
            </div>

            <div className="mt-10">
              {product.photo && (
                <div className="text-center">
                  <img src={URL.createObjectURL(product.photo)} alt='' height={'200px'} className='img img-responsive' />
                </div>
              )}
            </div>

            <div className="mt-3">
              <input type="text" className="form-control" name="name" value={product.name} placeholder="Enter product name" onChange={handleChange} required />
            </div>
            <div className="mt-3">
              <textarea className="form-control" name="description" value={product.description} placeholder="Enter product description" onChange={handleChange} />
            </div>
            <div className="mt-3">
              <input type="number" className="form-control" name="price" value={product.price} placeholder="Enter product price" onChange={handleChange} required />
            </div>
            <div className="mt-3">
              <input type="number" className="form-control" name="quantity" value={product.quantity} placeholder="Enter product quantity" border={'1px solid black'} onChange={handleChange} required />
            </div>
            <div className="mt-3 form-check">
              <input type="checkbox" className="form-check-input" name="shipping" checked={product.shipping} onChange={handleChange}
              />
              <label className="form-check-label ms-2">
                Want Delivery
              </label>
            </div>
            <div className="mt-3">
              <button type='submit' onClick={handleCreateProduct} className="btn btn-outline-success" >Create Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
