import styled from "styled-components";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/common/SubHeader";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
`;

const Label = styled.p`
  font-size: 15px;
`;

const InputContainer = styled.div`
  width: 300px;
`;

const InputBox = styled.input`
  padding: 2px;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  width: 294px;
  height: 30px;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 300px;
  height: 45px;
  background: var(--main);
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
`;
const SignupButton = styled.button`
  width: 300px;
  height: 45px;
  background: var(--gray);
  border: none;
  border-radius: 6px;
  padding: 0.5rem;

  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;
`;

const Typo = styled.span`
  font-size: 0.5em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: var(--main);
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const { formData, errors, handleInputChange, handleLogin, handleKeyDown } =
    useLogin();

  const handleGoToSignup = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <SubHeader />
      <Title>FarmPlus 로그인</Title>
      <Form name="loginForm">
        <InputContainer>
          <Label>이메일</Label>
          <InputBox
            onChange={handleInputChange}
            name="email"
            value={formData.email}
            type="text"
            placeholder="이메일을 입력하세요"
          ></InputBox>
          <br />
          <Typo>{errors.email}</Typo>
        </InputContainer>

        <InputContainer>
          <Label>비밀번호</Label>
          <InputBox
            onChange={handleInputChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="비밀번호를 입력하세요"
          ></InputBox>
          <br />
          <Typo>{errors.password}</Typo>
        </InputContainer>

        <Typo>{errors.allField}</Typo>
        <SubmitButton
          type="button"
          onClick={handleLogin}
          onKeyDown={handleKeyDown}
        >
          로그인하기
        </SubmitButton>
        <SignupButton onClick={handleGoToSignup}>회원가입하기</SignupButton>
      </Form>
    </Wrapper>
  );
}
