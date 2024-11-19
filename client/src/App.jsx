import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customer from "./customer/Customer";
import Admin from "./admin/Admin";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import UploadFile from "./components/UploadFile";

function App() {
  const { userdata } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            // path="/customer/*"
            element={<PrivateRoute role="customer" userRole={userdata?.role} />}
          >
            <Route path="/customer" element={<Customer />} />
          </Route>
          <Route
            // path="/customer/*"
            element={<PrivateRoute role="customer" userRole={userdata?.role} />}
          >
            <Route path="/customer/upload" element={<UploadFile />} />
          </Route>

          <Route
            element={<PrivateRoute role="admin" userRole={userdata?.role} />}
          >
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
