import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

export const AdminRoute = () => {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false); // To check if user is login or not and render corresponding component

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth", {
                headers: {
                    "Authorization": auth?.token
                }
            })
            if (res.data.success) {
                setOk(true);
            } else {
                toast("You are not a Admin")
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path="" />;

}

export default AdminRoute
