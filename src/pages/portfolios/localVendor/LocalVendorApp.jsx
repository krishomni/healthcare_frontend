import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import TaggedImage from "./sections/TaggedImage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { VendorProvider } from "../../../context/VendorContext.jsx";
import API from "./services/api";
import { AuthContext } from "../../../context/AuthContext.jsx";

function LocalVendorApp() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get(`/vendor/${id}/full`)
      .then((res) => setPortfolio(res.data))
      .catch((err) => console.error("Failed to fetch vendor portfolio", err));
  }, [id]);

  if (!portfolio) return <p>Loading portfolio...</p>;

  return (
    <VendorProvider>
      <div className="localvendor">
        <div className="min-h-screen flex flex-col">
          <Navbar user={user} />
          <main className="flex-grow">
            <ToastContainer />
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="admin/tagged" element={<TaggedImage />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </VendorProvider>
  );
}

export default LocalVendorApp;
