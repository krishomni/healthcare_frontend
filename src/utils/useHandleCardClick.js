import { useNavigate } from "react-router-dom";

export function useHandleCardClick() {
  const navigate = useNavigate();

  const handleCardClick = (p) => {
    console.log("p in useHandleCardClick() ", p);
    console.log("p portfolio Type: ", p?.portfolioType);
    if (p.type === "handyman") {
      navigate(`/portfolios/handyman/${p._id}`);
    } else if (p.type === "cleaningLady") {
      navigate(`/portfolios/cleaningService/${p._id}/about`);
    } else if (p.type === "vendor") {
      const username = (p.name || p.email || "vendor").toLowerCase().replace(/\s+/g, "-");
      navigate(`/portfolios/vendor/${username}/${p._id}`);
    } else {
      const username = (p.email || "").split("@")[0];
      navigate(`/portfolios/project-manager/${username}/${p._id}`);
    }
  };

  return { handleCardClick };
}
