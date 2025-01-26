import styled from "styled-components";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.body`
  margin: 0;
  height: 100vh; /* 화면 전체 높이를 사용 */
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;
const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: #04b404;
`;
const InputBox = styled.input`
  padding: 0.5rem;
  background: #fafafa;
  border: 0.05rem solid #d8d8d8;
  border-radius: 5px;
  width: 18rem;
`;

const InputContainer = styled.div`
  width: 20rem;
`;
const Label = styled.p`
  font-size: 1em;
`;
const SubmitButton = styled.button`
  background: #04b404;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
`;

export default function SignupPage() {
  const navigate = useNavigate();

  const { formData, errors, handleInputChange, handleSignup } = useSignup();

  return (
    <FormContainer>
      <Form name="loginForm">
        <Title>FARM</Title>
        <InputContainer>
          <Label>이메일</Label>
          <InputBox
            onChange={handleInputChange}
            name="email"
            value={formData.email}
            type="text"
            placeholder="이메일을 입력하세요."
          ></InputBox>
          {errors.email}
        </InputContainer>

        <InputContainer>
          <Label>이름</Label>
          <InputBox
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            type="text"
            placeholder="아름을 입력하세요."
          ></InputBox>
          {errors.name}
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
          {errors.nickname}
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
          {errors.password}
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
          {errors.confirmPassword}
        </InputContainer>

        <InputContainer>
          <Label>주소</Label>
          <InputBox
            onChange={handleInputChange}
            name="address"
            value={formData.address}
            type="text"
            placeholder="주소를 입력하세요."
          ></InputBox>
          {errors.address}
        </InputContainer>

        <InputContainer>
          <Label>연락처(휴대폰)</Label>
          <InputBox
            onChange={handleInputChange}
            name="phoneNumber"
            value={formData.phoneNumber}
            type="text"
            placeholder="연락처를 입력하세요."
          ></InputBox>
          {errors.phoneNumber}
        </InputContainer>

        {errors.allField}
        <SubmitButton type="button" onClick={handleSignup}>
          회원가입 하기
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}
