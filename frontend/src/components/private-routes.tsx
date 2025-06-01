import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token"); // clear expired token
        return <Navigate to="/login" replace />;
    }

    return children;
    // return token ? children : <Navigate to="/login" replace />;
};

function isTokenExpired(token) {
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        return decoded.exp < currentTime;
    } catch (error) {
        return true; // Treat invalid token as expired
    }
}

export default PrivateRoute;
