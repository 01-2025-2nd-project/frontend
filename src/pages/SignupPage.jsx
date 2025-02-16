import styled from "styled-components";
import useSignup from "../hooks/useSignup";
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

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: var(--main);
`;

const InputBox = styled.input`
  padding: 2px;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  width: 294px;
  height: 30px;
  outline: none;
`;

const InputContainer = styled.div`
  width: 300px;
`;
const Label = styled.p`
  font-size: 15px;
`;
const SubmitButton = styled.button`
  width: 300px;
  height: 45px;
  background: var(--main);
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 30px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const ErrorText = styled.p`
  font-size: 12px;
`;

const Button = styled.button`
  height: 32px;
  padding: 0 10px;
  background: var(--main);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function SignupPage() {
  const {
    formData,
    handleInputChange,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    handleSignup,
    isEmailValid,
    isNicknameValid,
    errors,
  } = useSignup();

  return (
    <Wrapper>
      <SubHeader />
      <Title>FarmPlus 회원가입</Title>

      <Form name="signupForm">
        <InputContainer>
          <Label>이메일</Label>
          <InputBox
            onChange={handleInputChange}
            name="email"
            value={formData.email}
            type="text"
            placeholder="이메일을 입력하세요."
          ></InputBox>
          <Button type="button" onClick={checkEmailDuplicate}>
            중복 확인
          </Button>
          <ErrorText>{errors.email}</ErrorText>
        </InputContainer>

        <InputContainer>
          <Label>이름</Label>
          <InputBox
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            type="text"
            placeholder="이름을 입력하세요."
          ></InputBox>

          <ErrorText>{errors.name}</ErrorText>
        </InputContainer>

        <InputContainer>
          <Label>닉네임</Label>
          <InputBox
            onChange={handleInputChange}
            name="nickname"
            value={formData.nickname}
            type="text"
            placeholder="닉네임을 입력하세요."
          ></InputBox>
          <Button type="button" onClick={checkNicknameDuplicate}>
            중복 확인
          </Button>
          <ErrorText>{errors.nickname}</ErrorText>
        </InputContainer>

        <InputContainer>
          <Label>비밀번호</Label>
          <InputBox
            onChange={handleInputChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="비밀번호를 입력하세요."
          ></InputBox>
          <ErrorText>{errors.password}</ErrorText>
        </InputContainer>

        <InputContainer>
          <Label>비밀번호 확인</Label>
          <InputBox
            onChange={handleInputChange}
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요."
          ></InputBox>
          <ErrorText>{errors.confirmPassword}</ErrorText>
        </InputContainer>

        <InputContainer>
          <Label>주소</Label>
          <InputBox
            onChange={handleInputChange}
            name="address"
            value={formData.address}
            type="text"
            placeholder="배송받을 주소를 입력하세요."
          ></InputBox>
          <ErrorText>{errors.address}</ErrorText>
        </InputContainer>

        <InputContainer>
          <Label>연락처(휴대폰)</Label>
          <InputBox
            onChange={handleInputChange}
            name="phoneNumber"
            value={formData.phoneNumber}
            type="text"
            placeholder="01000000000"
          ></InputBox>
          <ErrorText>{errors.phoneNumber}</ErrorText>
        </InputContainer>
      </Form>
      <ErrorText>{errors.allField}</ErrorText>
      <SubmitButton
        type="button"
        onClick={handleSignup}
        disabled={!isEmailValid || !isNicknameValid}
      >
        회원가입 하기
      </SubmitButton>
    </Wrapper>
  );
}
