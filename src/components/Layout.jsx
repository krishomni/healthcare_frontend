import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isPortfolio = location.pathname.startsWith("/portfolios/");
  const fromDashboard = location.state?.from === "dashboard";

  // Hide Navbar only if on a portfolio page AND came from dashboard
  const showNavbar = !(isPortfolio && fromDashboard);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={`min-h-screen w-full ${showNavbar ? "pt-20" : ""}`}>
        {children}
      </main>
    </>
  );
}
