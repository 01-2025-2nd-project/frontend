import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // if (
    //   password &&
    //   !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,12}$/.test(password)
    // ) {
    //   newErrors.password =
    //     "비밀번호를 다시 확인해주세요. 비밀번호는 대문자, 소문자, 숫자, 그리고 특수문자(!@#$%&*)를 포함한 8~12자 입니다.";
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validationForm()) {
      return;
    }

    try {
      console.log("보내는 데이터:", formData); //  확인용 콘솔 로그
      const res = await axios.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const token = res.headers.authorization?.split(" ")[1];

      if (token) {
        localStorage.setItem("token", token);
      }

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "로그인 실패");
      console.error(
        "로그인 오류:",
        error.response ? error.response.data : error
      );
    }
  };

  // 엔터 키 동작 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleLogin,
    handleKeyDown,
  };
}
