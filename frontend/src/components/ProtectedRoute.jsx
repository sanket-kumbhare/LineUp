import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const isAuthenticated = useSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
