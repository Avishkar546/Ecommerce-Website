import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import CategoryForm from '../../Components/Form/CategoryForm';
import { Modal, Button } from 'react-bootstrap';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState({
    name: ""
  });

  const [auth] = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const getAllCategories = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/category/get-all-categories");
    setCategories(data);
  }

  useEffect(() => {
    getAllCategories();
  }, []) // Dependency array kept blank if we need to run the present code only once when page is rendered

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = auth.token;
      const { data } = await axios.post("http://localhost:8080/api/v1/category/create-category", { name: category.name }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("After request");
      if (data?.success) {
        setCategory({
          name: ""
        })
        await getAllCategories();
        toast.success(data.message);
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      console.error('Failed to create category:', error);
      console.log('Error Response:', error.response);
      toast.error("Internal Server error");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((category) =>
    (
      { ...category, [name]: value }
    ))
  }

  const handleUpdateCategory = async (name, id) => {
    try {
      const token = auth.token;
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selectedCategoryId}`, { name: category.name }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      setCategory('');
      handleCloseModal();

      if (data.success) {
        setCategory({
          name: ""
        })
        await getAllCategories();
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Failed to update category:', error);
      console.log('Error Response:', error.response);
      toast.error("Internal Server error");
    }
  }

  const handleEdit = (categoryId, name) => {
    // Set the selected category ID and open the modal
    console.log(categoryId);
    setSelectedCategoryId(categoryId);
    setCategory({
      name:name
    })
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Reset the selected category ID and close the modal
    setSelectedCategoryId(null);
    setShowModal(false);
  };

  const handleDelete = async (categoryId) => {
    try {
      const token = auth.token;
      const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (data.success) {
        await getAllCategories();
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      console.log('Error Response:', error.response);
      toast.error("Internal Server error");
    }
  }

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Categories</h1>
          <div className="p-3 w-50">
            < CategoryForm handleSubmit={handleSubmit} handleChange={handleChange} category={category} />
          </div>
          <div className='w-75'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th className='text-center' scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((ct) => (
                  <tr key={ct._id}>
                    <td>{ct.name}</td>
                    <td className="text-center">
                      <button className="btn btn-primary mr-2" onClick={() => handleEdit(ct._id, ct.name)}>
                        Edit
                      </button>
                      {' '}
                      <button className="btn btn-danger" onClick={() => handleDelete(ct._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="editCategoryName" className="form-label">New Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="editCategoryName"
            name='name'
            value={category.name}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateCategory
