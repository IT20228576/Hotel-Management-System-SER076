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
import ContextProvider from '../layout/eventManagement/context/ContextProvider';


function Router() {
  return (
    <div className="App">
      <ContextProvider>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/a" element={<Home />} />
          <Route path="/viewlisttemplate" element={<ViewListTemplate />} />
          <Route exact path="/" element={<ViewListEvents/>} />
      <Route exact path="/event/new" element={<AddEvent/>} />
      <Route exact path="/edit/:id" element={<UpdateEvent/>} />
      <Route exact path="/view/:id" element={<ViewEvent/>} />
        </Routes>
      </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default Router;
