import { useNavigate } from "react-router-dom";

const AdminChoicePanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">  
      <button
        className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-slate-800/25 w-full sm:w-auto transition-all duration-300"
        onClick={() => navigate("/itadmin/logs")}
      >
        Logs
      </button>

      <button
        className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-slate-800/25 w-full sm:w-auto transition-all duration-300"
        onClick={() => navigate("/itadmin/ticketing-system")}
      >
        Ticketing System
      </button>
    </div>
  );
};

export default AdminChoicePanel;
