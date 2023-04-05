import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return user.isAdmin ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
