import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

const Wrapper = styled.div`
  width: 100vw
  height: 100vh;
  display: flex;
  padding: 10px;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 100vw;
  margin: 0px 20px 0px 20px;
`;

const MenuContainer = styled.div`
  height: 100vh;
  margin-right: 20px;
  margin-left: 10px;
`;

const FiMenuIcon = styled(FiMenu)`
  left: 10px;
  top: 10px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: black;
`;

const Title = styled.h1`
  margin: 0px;
`;

const Label = styled.label`
  font-size: 1em;
`;

const Input = styled.input`
  border: white;
  border-bottom: 1px solid #d9d9d7;
  width: 1000px;
  height: 20px;
  outline: none;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`;
const EditButton = styled.button`
  width: 100px;
  height: 30px;
  background: white-gray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 100px;
  height: 30px;
  background: gray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Divider = styled.hr`
  display: flex;
  margin-left: 0;
  width: 100%
  color: black;
`;

export default function MyInfo({ handleOnOff, onOff }) {
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

  const mockData = [
    {
      name: "lee",
      nickname: "leelee",
      email: "super@super.com",
      password: "1234",
      phoneNumber: "01012345678",
      address: "seoul",
      point: 1000000,
    },
  ];

  // 임시 데이터 불러오기
  useEffect(() => {
    setFormData(mockData[0]); //
    setOriginalProfileData(mockData[0]);
  }, []);

  // 프로필 입력 필드 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 프로필 변경 저장
  const handleSave = async () => {
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      // 닉네임 중복 확인 로직 들어가야 함 : 닉네임이 중복되지 않는지 확인하는 API 백엔드에 요청
      const checkResponse = await axios.post("/mypage", {
        nickname: formData.nickname,
      });

      if (checkResponse.data.isDuplicate) {
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }

      // 중복이 없으면 저장 API 호출
      const saveResponse = await axios.put("/mypage", formData);

      if (saveResponse.status === 200) {
        alert("프로필이 성공적으로 업데이트되었습니다!");
        setOriginalProfileData(formData); // 원본 데이터 업데이트
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 프로필 변경 취소
  const handleCancel = () => {
    setFormData(originalProfileData); // 화면에서 원래 데이터로 돌리기
  };

  return (
    <Wrapper onOff={onOff}>
      <MenuContainer>
        <FiMenuIcon onClick={handleOnOff} />
      </MenuContainer>

      <ContentContainer>
        <Title>내 정보</Title>
        <Divider></Divider>

        <InputBox>
          <InputContainer>
            <Label>이름</Label>
            <br />
            <Input type="text" name="name" value={formData.name} readOnly />
          </InputContainer>

          <InputContainer>
            <Label>닉네임</Label>
            <br />
            <Input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>이메일</Label>
            <br />
            <Input type="text" name="email" value={formData.email} readOnly />
          </InputContainer>

          <InputContainer>
            <Label>주소</Label>
            <br />
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>내 포인트</Label>
            <br />
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
