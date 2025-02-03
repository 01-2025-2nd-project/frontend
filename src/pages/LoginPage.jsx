import styled from "styled-components";
import useLogin from "../hooks/useLogin";
import kakaoLogin from "../images/kakao_login_medium_wide.png";

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
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SocialButton = styled.button`
  all: unset; /* 기본 스타일 제거 */
  cursor: pointer; /* 버튼처럼 보이도록 */
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
        <Divider />
        <SocialButton type="button" onClick={handleKakaoLogin}>
          <img src={kakaoLogin} alt="버튼 이미지" />
        </SocialButton>
      </Form>
    </>
  );
}
