import { useState, useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify"

const API_BASE = import.meta.env.VITE_BACKEND_API

const REQUEST_OPTIONS = [
  "Request additional portfolio slots",
  "Request a refund",
  "Upgrade subscription",
  "Downgrade subscription",
  "Update account information",
  "Coupon not working",
  "Report a technical issue",
  "Delete my account",
];

export default function ITForm() {
  const { contextLoggedIn } = useContext(AuthContext);  // deleted variable user

  const stored = useMemo(() => {
    if (!contextLoggedIn) return { name: "", email: "", portfolioId: "" };
    return {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      portfolioId: localStorage.getItem("portfolioId") || "",
    }
  }, [contextLoggedIn]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "",
    portfolioId: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: contextLoggedIn ? (stored.name || prev.name) : prev.name,
      email: contextLoggedIn ? (stored.email || prev.email) : prev.email,
      portfolioId: contextLoggedIn ? (stored.portfolioId || prev.portfolioId) : prev.portfolioId,
    }));
  }, [contextLoggedIn, stored.name, stored.email, stored.portfolioId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const shouldShowName = !contextLoggedIn || !stored.name;
  const shouldShowEmail = !contextLoggedIn || !stored.email;
  const shouldShowPortfolioId = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // for now just shows an alert, need to implement backend
    setErrMsg("");

    const payload = {
      name: contextLoggedIn ? (stored.name || form.name) : form.name,
      email: contextLoggedIn ? (stored.email || form.email) : form.email,
      phone: form.phone || "",
      requestType: form.requestType,
      portfolioId: contextLoggedIn ? (stored.portfolioId || form.portfolioId) : form.portfolioId,
      message: form.message,
    }

    if (!payload.name || !payload.email || !payload.requestType || !payload.message) {
      setErrMsg("Please complete all necessary fields.")
      return
    }

    setSubmitting(true)
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/support-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      let data = null;
      try {
        data = await res.json();
      } catch {

      }
      if (res.status === 201) {
        toast.success("Request submitted!");
        setForm({
          name: contextLoggedIn ? (stored.name || "") : "",
          email: contextLoggedIn ? (stored.email || "") : "",
          phone: "",
          requestType: "",
          portfolioId: contextLoggedIn ? (stored.portfolioId || "") : "",
          message: "",
        });
      } else if (res.status === 400) {
        setErrMsg(data?.error || "Failed to submit. Please check and try again.");
        toast.error(data?.error || "Failed to submit.");
      } else {
        setErrMsg(`Unexpected error (${res.status}). Please try again later.`)
        toast.error(`Unexpected error (${res.status}).`);
      }
    } catch (err) {
      setErrMsg("Network error. Please check your connection.");
      toast.error("Network error.")
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f7faff] to-[#f3f6fb] py-12 px-2">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Support & Help</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Submit a request or suggestion and our team will get back to you soon.
        </p>
        {/* optional reminder: login status and email） */}
        {contextLoggedIn && (
          <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-2 mb-4">
            Submitting as {stored.name || "User"} ({stored.email || "no-email"})
          </div>
        )}

        {errMsg && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 mb-4">
            {errMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {shouldShowName && (
              <div>
                <label className="block text-gray-700 text-xs font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                  placeholder="Your Name"
                  required
                />
              </div>
          )}
              {shouldShowEmail && (<div>
                <label className="block text-gray-700 text-xs font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
          )}

          <div>
            <label className="block text-gray-700 text-xs font-medium mb-1">Request Type</label>
            <select
              name="requestType"
              value={form.requestType}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              required
            >
              <option value="">Select an option</option>
              {REQUEST_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {shouldShowPortfolioId && (
          <div>
            <label className="block text-gray-700 text-xs font-medium mb-1">Portfolio ID (if relevant)</label>
            <input
              type="text"
              name="portfolioId"
              value={form.portfolioId}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              placeholder="Portfolio ID"
            />
          </div>
          )}
          <div>
            <label className="block text-gray-700 text-xs font-medium mb-1">Describe your issue or request</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              placeholder="Please provide details..."
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full text-white font-semibold py-2 rounded-md shadow transition-all hover:bg-blue-700 transition-all ${submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {submitting ? "Submitting...": "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}