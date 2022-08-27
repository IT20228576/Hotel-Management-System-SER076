import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Login from "../userManagement/authentication/Login";
import Register from "../userManagement/authentication/Register";
import Verify from "../userManagement/authentication/Verify";
import AuthContext from "../userManagement/context/UserContext";
import Profile from "../userManagement/user/Profile";

function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify/:id/:token" element={<Verify />} />
          {userType === null && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          {userType === "admin" && (
            <>
              <Sidebar />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {userType === "customer" && (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route exact path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
