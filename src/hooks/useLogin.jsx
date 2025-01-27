import axios from "axios";
import { useState } from "react";

export default function useLogin() {
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
      newErrors.password = "비밀번호를 다시 확인해주세요.";
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

    await axios.post("auth/login", {
      email: email,
      password: password,
    });
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleLogin,
  };
}
