import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

/**
 * Checks if the logged-in user has permission to edit a given vendor portfolio.
 * Returns true if the user is either:
 *  - an admin (user.role === "admin"), OR
 *  - the portfolio ID exists in user.portfolios.
 */
export const canEditPortfolio = (vendorId) => {
  const { user } = useContext(AuthContext);

  if (!user) return false;

  // Normalize values
  const loggedInRole = user.role?.toLowerCase() || "customer";
  const ownedPortfolios = user.portfolios || [];

  // Check permissions
  const isAdmin = loggedInRole === "admin";
  const isOwner = vendorId && ownedPortfolios.includes(vendorId);

  return isAdmin || isOwner;
};
