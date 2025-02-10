import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function useAuthUser() {
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.sub); // 토큰에서 사용자 ID 추출
        console.log(decodedToken.sub, "유저아이디");
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        setUserId(null);
      }
    }
  }, [token]);

  return userId;
}
