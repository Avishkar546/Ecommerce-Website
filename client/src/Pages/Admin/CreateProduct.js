import React, { useState, useEffect } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
// import 'antd/dist/antd.css';

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);

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

  const style = {
    border: 'none'
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
            <Select style={{ border: '2px solid black', borderRadius: '2px' }} placeholder="Search a category" size='large' showSearch className='form-select mb-3 p-2' onChange={(value) => setSearchCategory(value)}
              options={categories?.map((category) => ({ value: category._id, label: category.name }))}
              filterOption={filterOption}
            >
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
