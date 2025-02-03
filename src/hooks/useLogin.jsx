import axios from "axios";
import { SHA256 } from "crypto-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const K_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const K_REDIRECT_URI = `http://localhost:3000/kakao-login`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

export default function useLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 유효성 검사 로직
  const validationForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email || !password) {
      newErrors.allField = "이메일 또는 비밀번호를 입력해주세요. ";
    }

    if (
      email &&
      !/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)
    ) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    if (
      password &&
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,12}$/.test(password)
    ) {
      newErrors.password =
        "비밀번호를 다시 확인해주세요. 비밀번호는 대문자, 소문자, 숫자, 그리고 특수문자(!@#$%&*)를 포함한 8~12자 입니다.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validationForm()) {
      return;
    }

    const { email, password } = formData;

    const sha256Password = SHA256(password).toString();

    const userData = {
      email,
      password: sha256Password,
    };

    console.log("암호화된 비밀번호 : ", userData.password);

    await axios
      .post("/auth/login", userData)
      .then((res) => {
        const token = res.headers.authorization?.split("")[1];

        if (token) {
          // 로컬 스토리지에 액세스 토큰 저장
          localStorage.setItem("token", token);
        }
        navigate("/");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "로그인 실패");
      });
  };

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleLogin,
    handleKakaoLogin,
  };
}
