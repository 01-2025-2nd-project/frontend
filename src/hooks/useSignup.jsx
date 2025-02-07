import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
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
  const newErrors = {};

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 중복 확인 API 호출
  const isEmailDuplicate = async (email) => {
    try {
      const res = await axios.post("http://15.164.139.247:8080/auth/email", {
        email,
      });
      return res.data.data.check; // `true`이면 중복, `false`이면 사용 가능
    } catch (err) {
      console.error("이메일 중복 확인 오류:", err);
      return true; // 오류 발생 시 기본적으로 중복된 것으로 처리
    }
  };

  // 닉네임 중복 확인 API 호출

  const isNicknameDuplicate = async (nickname) => {
    try {
      const res = await axios.post("http://15.164.139.247:8080/auth/nickname", {
        nickname,
      });
      return res.data.data.check; // `true`이면 중복, `false`이면 사용 가능
    } catch (err) {
      console.error("닉네임 중복 확인 오류:", err);
      return true; // 오류 발생 시 기본적으로 중복된 것으로 처리
    }
  };

  // 회원가입 API 호출
  const signupUser = async (userData) => {
    try {
      await axios.post("http://15.164.139.247:8080/auth/sign-up", userData);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "회원가입 실패");
    }
  };

  // 유효성 검사 함수
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

    if (Object.values(formData).some((value) => !value.trim())) {
      newErrors.allField = "모든 필드를 입력해주세요.";
    }

    if (email && !/^[a-z0-9_\-.]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)) {
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
    if (address && address.length < 6) {
      newErrors.address = "상세 주소까지 정확히 입력해주세요.";
    }

    if (phoneNumber && !/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "올바른 연락처를 입력해주세요";
    }

    setErrors(newErrors);

    // 오류가 없으면 true 반환하기
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 동작을 먼저 방지하고

    if (!validationForm()) {
      return; // 유효성 검사를 통과하지 않으면 함수 중단
    }

    if (await isEmailDuplicate(formData.email)) {
      newErrors.email = "이미 사용 중인 이메일입니다.";
      setErrors(newErrors);
      return;
    }

    if (await isNicknameDuplicate(formData.nickname)) {
      newErrors.nickname = "이미 사용 중인 이메일입니다.";
      setErrors(newErrors);
      return;
    }

    await signupUser(formData);
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSignup,
  };
}
