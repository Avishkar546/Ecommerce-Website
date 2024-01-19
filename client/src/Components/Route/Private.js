import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

export const PrivateRoute = () => {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false); // To check if user is login or not and render corresponding component

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth", {
                headers: {
                    "Authorization": auth?.token
                }
            })
            // console.log(auth.user);
            if (res.data.success && auth.user.role === 0) {
                setOk(true);
            } else {
                toast("You are Admin. Not a user")
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token, auth?.user?.role])

    return ok ? <Outlet /> : <Spinner path="" />;

}

export default PrivateRoute