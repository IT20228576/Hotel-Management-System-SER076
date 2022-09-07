import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Login from "../userManagement/authentication/Login";
import Register from "../userManagement/authentication/Register";
import Verify from "../userManagement/authentication/Verify";
import AuthContext from "../userManagement/context/UserContext";
import Profile from "../userManagement/user/Profile";
import ViewListTemplate from "../layout/ViewListTemplate";
import AddEvent from "../layout/eventManagement/AddEvent";
import ViewEvent from "../layout/eventManagement/ViewEvent";
import ViewListEvents from "../layout/eventManagement/ViewListEvents";
import UpdateEvent from "../layout/eventManagement/UpdateEvent";
import ContextProvider from "../layout/eventManagement/context/ContextProvider";
import EventReport from "../layout/eventManagement/EventReport";
import ViewReservationList from "../reservationManagement/ViewReservationList";
import AddReservation from "../reservationManagement/AddReservation";
import AddRoom from "../roomMangement/AddRoom";
import ViewRooms from "../roomMangement/ViewRooms";
import UpdateRoom from "../roomMangement/UpdateRoom";
import ReservationReport from "../reservationManagement/ReservationReport";
import UpdateReservation from "../reservationManagement/UpdateReservation";
import Reserve from "../reservationManagement/Reserve";
import ConfirmReserve from "../reservationManagement/ConfirmReserve";
import Footer from "../layout/Footer";
import Dashboard from "../layout/Dashboard";

function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);

  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/verify/:id/:token" element={<Verify />} />
            <Route exact path="/" element={<Home />} />
            {userType === null && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/viewlisttemplate"
                  element={<ViewListTemplate />}
                />
                <Route exact path="/view" element={<ViewListEvents />} />
                <Route exact path="/event/new" element={<AddEvent />} />
                <Route exact path="/edit/:id" element={<UpdateEvent />} />
                <Route exact path="/view/:id" element={<ViewEvent />} />
                <Route path="/eventreport" element={<EventReport />} />
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

            {/*Rooms Routes*/}
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/viewRooms" element={<ViewRooms />} />
            <Route path="/updateRoom" element={<UpdateRoom />} />

            {/*Reservation Routes*/}
            <Route
              exact
              path="/reservations"
              element={<ViewReservationList />}
            />
            <Route
              exact
              path="/reservations/add"
              element={<AddReservation />}
            />
            <Route
              exact
              path="/reservations/update"
              element={<UpdateReservation />}
            />
            <Route
              exact
              path="/reservations/report"
              element={<ReservationReport />}
            />
            <Route exact path="/reserve" element={<Reserve />} />
            <Route exact path="/reserve/confirm" element={<ConfirmReserve />} />
            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default Router;
