import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isPortfolio = location.pathname.startsWith("/portfolios/");

  return (
    <>
      {/* only render Navbar if not on a portfolio page */}
      {!isPortfolio && <Navbar />}
      <main className={`min-h-screen w-full ${!isPortfolio ? "pt-20" : ""}`}>
        {children}
      </main>
    </>
  );
}
