import { useState } from "react";
import axios from "axios";
import SmallSpinner from "@/ui_components/SmallSpinner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      await axios.post("https://codenest-backend.onrender.com/api/auth/request-reset-email/", {
        email,
      });
      setMsg("Check your email for a reset link.");
    } catch (err) {
      console.error("Error response:", err.response);
      if (err.response && err.response.data) {
        setMsg(err.response.data.error || "Something went wrong.");
      } else {
        setMsg("Something went wrong.");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold dark:text-white">Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your registered email"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? (
            <span className="text-base flex items-center gap-2 justify-center">
                <SmallSpinner /> <small>Sending...</small>
            </span>
            ) : (
            <small className="text-base">Send Reset Link</small>
        )}
      </button>
      {msg && <p className="text-base text-green-600">{msg}</p>}
    </form>
  );
}
