import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useSearch } from '../../Context/SearchContext'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const { values, setValues } = useSearch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.keywords.length) {
            alert("Provide valid keywords");
            return;
        }
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keywords}`);
            setValues({ ...values,keywords:"", result: data.result })
            navigate("/search");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <form className="d-flex form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keywords}
                onChange={(e) => { setValues({ ...values, keywords: e.target.value }) }} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>

    )
}

export default Search
