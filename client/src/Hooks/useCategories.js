import axios from "axios";
import { useEffect, useState } from "react"

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-all-categories")
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return categories;
}
