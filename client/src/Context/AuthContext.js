import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: "",
        token: null
    })
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parsedData.user,
                token: parsedData.jwtToken
            });
        } 
    }, []) 
    return (
        <AuthContext.Provider value={[auth, setAuth]} >
            {children}
        </AuthContext.Provider>
    )
}

// This is custom hooks which are basically react component (Function) helps to provide DRY property.
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };