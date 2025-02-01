import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SHA256 } from "crypto-js";

export default function useSignup(onSuccess) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 유효성 검사 로직
  const validationForm = () => {
    const {
      email,
      nickname,
      name,
      password,
      confirmPassword,
      address,
      phoneNumber,
    } = formData;

    const newErrors = {};

    if (
      !email ||
      !nickname ||
      !name ||
      !password ||
      !confirmPassword ||
      !address ||
      !phoneNumber
    ) {
      newErrors.allField = "모든 필드를 입력해주세요.";
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
        "비밀번호가 너무 약합니다! 대문자, 소문자, 숫자, 그리고 특수문자(!@#$%&*)를 포함한 8~12자를 입력해주세요.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (address && address.length < 10) {
      newErrors.address = "상세 주소까지 정확히 입력해주세요.";
    }

    if (phoneNumber && !/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "올바른 연락처를 입력해주세요";
    }

    setErrors(newErrors);

    // 오류가 없으면 true 반환하기
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 함수
  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 동작을 먼저 방지하고

    if (!validationForm()) {
      return; // 유효성 검사를 통과하지 않으면 함수 중단
    }

    const { email, nickname, name, password, address, phoneNumber } = formData;

    const sha256Password = SHA256(password).toString();

    const userData = {
      name,
      nickname,
      email,
      password: sha256Password,
      phoneNumber,
      address,
    };
    console.log("암호화된 비밀번호 : ", userData.password);

    await axios
      .post("/auth/sign-up", userData)
      .then((res) => {
        alert("회원가입 성공!");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "회원가입 실패");
      });
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSignup,
  };
}
