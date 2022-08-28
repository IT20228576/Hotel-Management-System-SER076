import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../layout/Home";
import HomeBody from "../layout/HomeBody";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homebody" element={<HomeBody />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
