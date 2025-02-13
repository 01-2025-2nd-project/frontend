import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1em;
`;

const Input = styled.input`
  border: white;
  border-bottom: 1px solid #d9d9d7;
  width: 600px;
  height: 20px;
  outline: none;
  background: none;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-top: 50px;
`;

const EditButton = styled.button`
  width: 100px;
  height: 30px;
  background: var(--main);
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 100px;
  height: 30px;
  background: var(--gray);
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default function MyInfo() {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    point: "",
  });

  const [originalProfileData, setOriginalProfileData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    point: "",
  });

  // 프로필 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // 🔥 토큰이 없으면 요청하지 않음

      try {

        const response = await axios.get("/api/mypage", {

          headers: {
            Authorization: `Bearer ${token}`,
          },

        });

        if (response.data && response.data.data) {
          // 🔥 응답 데이터가 있는지 확인 후 상태 업데이트
          setFormData(response.data.data);
          setOriginalProfileData(response.data.data);
        }
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [token]); // 🔥 token이 바뀌면 다시 실행

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 프로필 저장
  const handleSave = async () => {
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      console.log("내가 보내는 닉네임: ", formData.nickname);


      // 닉네임 중복 확인 로직
      const checkResponse = await axios.post(
        "http://15.164.139.247:8080/auth/nickname",
        {
          nickname: formData.nickname,
        }
      );


      console.log("중복 확인 응답:", checkResponse.data);

      if (checkResponse.data.code !== "200") {
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }


      // 중복이 없으면 저장 API 호출
      const saveResponse = await axios.put(
        "http://15.164.139.247:8080/mypage",
        formData
      );


      if (saveResponse.status === 200) {
        alert("프로필이 성공적으로 업데이트되었습니다!");
        setOriginalProfileData(formData);
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 프로필 변경 취소
  const handleCancel = () => {
    setFormData(originalProfileData);
  };

  return (
    <Wrapper>
      <ContentContainer>
        <InputBox>
          <InputContainer>
            <Label>이름</Label>
            <Input type="text" name="name" value={formData.name} readOnly />
          </InputContainer>

          <InputContainer>
            <Label>닉네임</Label>
            <Input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>이메일</Label>
            <Input type="text" name="email" value={formData.email} readOnly />
          </InputContainer>

          <InputContainer>
            <Label>주소</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>내 포인트</Label>
            <Input type="text" name="point" value={formData.point} readOnly />
          </InputContainer>
        </InputBox>

        <ButtonContainer>
          <EditButton onClick={handleSave}>수정하기</EditButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ButtonContainer>
      </ContentContainer>
    </Wrapper>
  );
}
