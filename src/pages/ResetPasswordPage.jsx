import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
//   console.log("Reset token:", uidb64, token);

  const handleReset = async () => {
  try {
    await axios.post(`https://codenest-backend.onrender.com/auth/password-reset-confirm/${uidb64}/${token}/`, {
        password: password,
    });
    toast.success("Password reset Successful!!");
    navigate("/login");
  } catch (err) {
    toast.error(err.message);
  }
};


  return (
    <div>
      <h2 className="text-xl font-bold dark:text-white gap-4 p-4 mt-10 justify-center flex">Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-4 rounded flex flex-col gap-4 max-w-md mx-auto mt-5"
      />
      <button type="submit" onClick={handleReset} className="bg-blue-600 text-white 
      p-4 rounded flex flex-col dark:text-white gap-4 max-w-md mx-auto my-10">Reset Password</button>
    </div>
  );
}

export default ResetPasswordPage;
