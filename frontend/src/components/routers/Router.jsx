// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import ViewListTemplate from "../layout/ViewListTemplate";

import AddEvent from "../layout/eventManagement/AddEvent";
import ViewEvent from "../layout/eventManagement/ViewEvent";
import ViewListEvents from "../layout/eventManagement/ViewListEvents";
import UpdateEvent from "../layout/eventManagement/UpdateEvent";


function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewlisttemplate" element={<ViewListTemplate />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/event/:id" exact element={<ViewEvent />} />
          <Route path="/view" element={<ViewListEvents />} />
          <Route path="/updateevent/:id" element={<UpdateEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
