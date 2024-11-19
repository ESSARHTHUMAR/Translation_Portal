import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

//To keep the Customer & Admin routes private
const PrivateRoute = ({ role, userRole }) => {
  const { userdata } = useSelector((state) => state.user);

  //Not loggedin then redirect to the Login page
  if (!userdata) {
    return <Navigate to="/login" />;
  }

  //Trying to access different role, redirects to Home page
  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  //If user is logged in as well as roles are matching, 
  //relevant user data will be displayed.
  return <Outlet />;
};

export default PrivateRoute;
