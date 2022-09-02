import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";


import Home from "../layout/Home";
import Navbar from "../layout/Navbar";

import Sidebar from "../layout/Sidebar";
import Login from "../userManagement/authentication/login";
import Register from "../userManagement/authentication/register";


import Verify from "../userManagement/authentication/Verify";
import AuthContext from "../userManagement/context/UserContext";
import Profile from "../userManagement/user/Profile";

import ViewListTemplate from "../layout/ViewListTemplate";

import AddEvent from "../layout/eventManagement/AddEvent";
import ViewEvent from "../layout/eventManagement/ViewEvent";
import ViewListEvents from "../layout/eventManagement/ViewListEvents";
import UpdateEvent from "../layout/eventManagement/UpdateEvent";
import ContextProvider from "../layout/eventManagement/context/ContextProvider";

import ViewReservationList from "../reservationManagement/ViewReservationList";

import EventReport from "../layout/eventManagement/EventReport";


import AddReservation from "../reservationManagement/AddReservation";


function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);

  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/a" element={<Home />} />

          <Route path="/a" element={<Home />} />
          <Route path="/verify/:id/:token" element={<Verify />} />
          {userType === null && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/viewlisttemplate" element={<ViewListTemplate />} />
          <Route exact path="/view" element={<ViewListEvents/>} />
      <Route exact path="/event/new" element={<AddEvent/>} />
      <Route exact path="/edit/:id" element={<UpdateEvent/>} />
      <Route exact path="/view/:id" element={<ViewEvent/>} />
      <Route path="/eventreport" element={<EventReport />} />
            </>
          )}

          {userType === "Admin" && (
            <>
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/viewlisttemplate" element={<ViewListTemplate />} />
          <Route exact path="/view" element={<ViewListEvents/>} />
      <Route exact path="/event/new" element={<AddEvent/>} />
      <Route exact path="/edit/:id" element={<UpdateEvent/>} />
      <Route exact path="/view/:id" element={<ViewEvent/>} /> */}
            </>
          )}

          {userType === "Customer" && (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route exact path="/" element={<Home />} />
        {/* </Routes>
      </BrowserRouter> */}
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

            {/* <Route exact path="/event" element={<ViewListEvents />} />

            <Route exact path="/events" element={<ViewListEvents />} />

            <Route exact path="/event/new" element={<AddEvent />} />
            <Route exact path="/edit/:id" element={<UpdateEvent />} />
            <Route exact path="/view/:id" element={<ViewEvent />} /> */}
            
            <Route exact path="/reservations" element={<ViewReservationList />} />
            <Route exact path="/reservations/add" element={<AddReservation />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default Router;
