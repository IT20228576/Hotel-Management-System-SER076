import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Login from "../userManagement/authentication/login";

function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
