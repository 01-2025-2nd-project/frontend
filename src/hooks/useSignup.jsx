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
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 중복 확인 완료 여부
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 중복 확인 완료 여부

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

      return res.data.code !== 200; // 200이면 사용 가능(false), 그 외는 중복(true)
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
      return res.data.code !== 200; // 200이면 사용 가능(false), 그 외는 중복(true)
    } catch (err) {
      console.error("닉네임 중복 확인 오류:", err);
      return true;
    }
  };

  // 유효성 검사 함수
  const validationForm = () => {
    const { email, password, confirmPassword, address } = formData;
    const newErrors = {};

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

    // 이메일 중복 확인
    if (!isEmailValid) {
      console.log("이메일 중복 확인이 필요합니다.");
      return; // 이메일이 유효하지 않으면 진행하지 않음
    }

    // 닉네임 중복 확인
    if (!isNicknameValid) {
      console.log("닉네임 중복 확인이 필요합니다.");
      return; // 닉네임이 유효하지 않으면 진행하지 않음
    }

    // 유효성 검사를 통과하면 회원가입 API 호출
    signupUser();
  };

  // 이메일 중복 확인 API
  const checkEmailDuplicate = async () => {
    try {
      console.log("보내는 데이터 (이메일 중복 확인):", {
        email: formData.email,
      });
      const res = await axios.post("http://15.164.139.247:8080/auth/email", {
        email: formData.email,
      });

      console.log("받은 데이터 (이메일 중복 확인 응답):", res.data);

      if (res.data.code === 200) {
        alert("사용 가능한 이메일입니다.");
        setIsEmailValid(true);
      } else {
        alert("이미 사용 중인 이메일입니다.");
        setIsEmailValid(false);
      }
    } catch (err) {
      console.error("이메일 중복 확인 오류:", err);
      alert("이메일 확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 확인 API
  const checkNicknameDuplicate = async () => {
    try {
      console.log("보내는 데이터 (닉네임 중복 확인):", {
        nickname: formData.nickname,
      });
      const res = await axios.post("http://15.164.139.247:8080/auth/nickname", {
        nickname: formData.nickname,
      });

      console.log("받은 데이터 (닉네임 중복 확인 응답):", res.data);

      if (res.data.code === 200) {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameValid(true);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameValid(false);
      }
    } catch (err) {
      console.error("닉네임 중복 확인 오류:", err);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 API
  const signupUser = async () => {
    try {
      console.log("보내는 데이터 (회원가입):", formData);
      const response = await axios.post(
        "http://15.164.139.247:8080/auth/sign-up",
        formData
      );
      console.log("받은 데이터 (회원가입 응답):", response.data);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert(error.response?.data?.message || "회원가입 실패");
    }
  };

  return {
    formData,
    handleInputChange,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    handleSignup, // 회원가입 함수 반환

    isEmailValid,
    isNicknameValid,
    errors, // 오류 메시지도 반환
  };
}
