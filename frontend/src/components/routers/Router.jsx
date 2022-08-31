import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Login from "../userManagement/authentication/login";
import Register from "../userManagement/authentication/register";
import Verify from "../userManagement/authentication/Verify";
import AuthContext from "../userManagement/context/userContext";
import Profile from "../userManagement/user/Profile";
import ViewListTemplate from "../layout/ViewListTemplate";

import AddEvent from "../layout/eventManagement/AddEvent";
import ViewEvent from "../layout/eventManagement/ViewEvent";
import ViewListEvents from "../layout/eventManagement/ViewListEvents";
import UpdateEvent from "../layout/eventManagement/UpdateEvent";

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

          {userType === "Admin" && (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {userType === "Customer" && (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route exact path="*" element={<Home />} />
          <Route path="/viewlisttemplate" element={<ViewListTemplate />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/event/:id" exact element={<ViewEvent />} />
          <Route path="/" element={<ViewListEvents />} />
          <Route path="/updateevent/:id" element={<UpdateEvent />} />      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
