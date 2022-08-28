import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../layout/Home";
import HomeBody from "../layout/HomeBody";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import ViewListTemplate from "../layout/ViewListTemplate";

function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homebody" element={<HomeBody />} />
          <Route path="/viewlisttemplate" element={<ViewListTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
