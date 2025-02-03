import axios from "axios";
import { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code:", code);

  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  useEffect(() => {
    axios
      .post(`/auth/kakao-login?code=${code}`, {}, { headers })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.result.user_id);
        console.log(response.data.result.jwt);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }, []);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}
