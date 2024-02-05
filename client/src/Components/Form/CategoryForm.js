import React from 'react'

const CategoryForm = ({handleSubmit, handleChange, category}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category Name</label>
                    <input type="text" className="form-control" id="category" name='name' value={category.name} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary text-center">Submit</button>
            </form>
        </div>
    )
}

export default CategoryForm
