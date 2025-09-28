import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KebabMenu({ portfolio }) {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        event.stopPropagation();
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
          <div className="py-1">
            <button
              onClick={(event) => {
                event.stopPropagation();
                // TODO: Add functionality for free domain
                const username = portfolio.email.split("@")[0];

                // change this if you change the handleCardClick in Dashboard.jsx
                navigate(
                  `/portfolios/project-manager/${username}/${portfolio._id}`
                );

                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Use a free domain
            </button>
            <button
              onClick={async (event) => {
                event.stopPropagation();
                const customDomain = prompt(
                  "Enter your custom domain (e.g., yourdomain.com):"
                );
                if (customDomain) {
                  try {
                    const response = await fetch(
                      `${backendUrl}/api/domains/custom`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          domain: customDomain,
                          portfolioId: portfolio._id,
                        }),
                      }
                    );

                    if (response.ok) {
                      alert(
                        `Custom domain ${customDomain} configured! Please update your DNS settings.`
                      );
                    } else {
                      alert("Failed to configure custom domain");
                    }
                  } catch (error) {
                    console.error("Custom domain error:", error);
                    alert("Error configuring custom domain");
                  }
                }
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Use your own domain
            </button>
            <button
              onClick={(event) => {
                // TODO: Add functionality for buying domain
                navigate("/domain-search");
                event.stopPropagation();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Buy your own domain from us
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
