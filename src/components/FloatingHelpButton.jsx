import { useNavigate } from "react-router-dom";

export default function FloatingHelpButton() {
  const navigate = useNavigate();

  return (
    <button
      className="fixed bottom-6 right-6 z-50 bg-blue-300/40 text-slate-800 px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-300 overflow-hidden group"
      onClick={() => navigate("/support")}
      aria-label="Need Help?"
      style={{ boxShadow: "0 4px 24px 0 rgb(30 64 175 / 12%)" }}
    >
      <span className="absolute inset-0 w-1/3 h-full bg-white/40 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></span>
      <span className="relative z-10 font-semibold">Need Help?</span>
    </button>
  );
}