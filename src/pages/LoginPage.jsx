import styled from "styled-components";
import useLogin from "../hooks/useLogin";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
`;

const Label = styled.p`
  font-size: 1em;
`;

const InputContainer = styled.div`
  width: 20rem;
`;

const InputBox = styled.input`
  padding: 0.5rem;
  background: #fafafa;
  border: 0.05rem solid #d8d8d8;
  border-radius: 5px;
  width: 18rem;
`;

const SubmitButton = styled.button`
  background: #04b404;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
`;

const SocialButton = styled.button`
  background: #04b404;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  width: 20rem;
`;

const Typo = styled.span`
  font-size: 0.5em;
`;

const Divider = styled.hr`
  border-top: 0.05em solid #fafafa;
  width: 20rem;
`;

export default function LoginPage() {
  const { formData, errors, handleInputChange, handleLogin, handleKakaoLogin } =
    useLogin();

  return (
    <>
      <Form name="loginForm">
        <SocialButton type="button" onClick={handleKakaoLogin}>
          카카오톡으로 로그인하기
        </SocialButton>
        <Divider />
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
        <SubmitButton type="button" onClick={handleLogin}>
          로그인하기
        </SubmitButton>
      </Form>
    </>
  );
}
