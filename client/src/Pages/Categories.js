import React from 'react'
import { useCategories } from '../Hooks/useCategories'

const Categories = () => {
    const categories = useCategories();
    return (
        <div>
            {categories && categories.map(c => {
                <button className='btn btn-primary m-10'>{c.name}</button>
            })
            }
        </div>
    )
}

export default Categories
