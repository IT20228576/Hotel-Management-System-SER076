import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Login from "../userManagement/authentication/login";
import Register from "../userManagement/authentication/register";
import AuthContext from "../userManagement/context/userContext";

function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {userType === null && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          {userType === "admin" && (
            <>
              <Sidebar />
              <Route path="/profile" element={<Home />} />
            </>
          )}

          {userType === "customer" && (
            <>
              <Route path="/profile" element={<Home />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
