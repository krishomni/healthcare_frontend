import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export function useHandleCardClick() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCardClick = (p) => {
    const userPortfoliosArray = user.portfolios;
    console.log("user in handleCard click: ", user);
    const portfolio = userPortfoliosArray.find((portfolios) => portfolios.portfolioId === p._id);

    console.log("p in useHandleCardClick() ", p);
    console.log("portfolio Type: ", portfolio.portfolioType);
    if (portfolio.portfolioType === "Handyman") {
      navigate(`/portfolios/handyman/${p._id}`);
    } else if (portfolio.portfolioType === "CleaningLady") {
      navigate(`/portfolios/cleaningService/${p._id}/about`);
    } else if (portfolio.portfolioType === "LocalVendor") {
      const username = (p.name || p.email || "vendor").toLowerCase().replace(/\s+/g, "-");
      navigate(`/portfolios/vendor/${username}/${p._id}`);
    } else if (portfolio.portfolioType === "ProjectManager") {
      navigate(`/portfolios/project-manager/${p.name}/${p._id}`);
    } else {
      // const username = (p.email || "").split("@")[0];
      // navigate(`/portfolios/project-manager/${username}/${p._id}`);
      toast.error("Portfolio Type not found");
    }
  };

  return { handleCardClick };
}
