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
      console.log("이메일 중복 확인 응답:", res.data); // 응답 확인

      if (!res.data || !res.data.message) {
        throw new Error("응답 데이터가 올바르지 않습니다.");
      }

      return res.data.code !== "200"; // 200이면 사용 가능(false), 그 외는 중복(true)
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

      console.log("닉네임 중복 확인 응답:", res.data); // 응답 확인
      return res.data.code !== "200"; // 200이면 사용 가능(false), 그 외는 중복(true)
    } catch (err) {
      console.error("닉네임 중복 확인 오류:", err);
      return true;
    }
  };

  // 회원가입 API 호출
  const signupUser = async (userData) => {
    try {
      console.log("보내는 데이터:", userData); //  확인용 콘솔 로그
      const response = await axios.post(
        "http://15.164.139.247:8080/auth/sign-up",
        userData
      );
      alert("회원가입 성공!");
      console.log("회원가입 응답:", response.data);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "회원가입 실패");
      console.error(
        "회원가입 요청 실패:",
        error.response ? error.response.data : error
      );
    }
  };

  // 유효성 검사 함수
  const validationForm = () => {
    const { email, password, confirmPassword, address } = formData;

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

    setErrors(newErrors);

    // 오류가 없으면 true 반환하기
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 동작을 먼저 방지하고
    console.log("회원가입 버튼 클릭");

    if (!validationForm()) {
      console.log("유효성 검사 실패");
      return; // 유효성 검사를 통과하지 않으면 함수 중단
    }

    try {
      const [emailDuplicate, nicknameDuplicate] = await Promise.all([
        isEmailDuplicate(formData.email),
        isNicknameDuplicate(formData.nickname),
      ]);

      console.log("이메일 중복 확인 결과:", emailDuplicate);
      console.log("닉네임 중복 확인 결과:", nicknameDuplicate);

      if (!emailDuplicate) {
        newErrors.email = "이미 사용 중인 이메일입니다.";
        setErrors(newErrors);
        return;
      }

      if (!nicknameDuplicate) {
        newErrors.nickname = "이미 사용 중인 닉네임입니다.";
        setErrors(newErrors);
        return;
      }

      console.log("회원가입 처리 직전");

      // 이메일과 닉네임 중복이 아닌 경우 회원가입 처리
      await signupUser(formData);
    } catch (err) {
      console.error("중복 확인 과정에서 오류 발생:", err);
    }
  };

  // 엔터 키 동작 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSignup,
    handleKeyDown,
  };
}
