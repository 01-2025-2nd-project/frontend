import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return { handleLogout };
}
