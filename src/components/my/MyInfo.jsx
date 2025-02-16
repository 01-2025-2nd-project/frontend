import axios from "axios";
import { address } from "framer-motion/client";
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
  font-size: 20px;
`;

const Input = styled.input`
  border: white;
  border-bottom: 1px solid #d9d9d7;
  width: 500px;
  height: 20px;
  outline: none;
  background: none;
  font-size: 15px;
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
  gap: 10px;
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
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const CancelButton = styled.button`
  width: 100px;
  height: 30px;
  background: var(--gray);
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const CheckButton = styled.button`
  width: 80px;
  height: 25px;
  background: var(--main);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
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

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // 프로필 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://15.164.139.247:8080/mypage", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.data) {
          setFormData(response.data.data);
          setOriginalProfileData(response.data.data);
        }
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [token]);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "nickname") {
      setIsNicknameChecked(false); // 닉네임을 수정하면 다시 중복 확인이 필요함
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      console.log("닉네임 중복 확인 요청:", formData.nickname);

      const checkResponse = await axios.post(
        "http://15.164.139.247:8080/auth/nickname",
        {
          nickname: formData.nickname,
        }
      );

      console.log("중복 확인 응답:", checkResponse.data);

      if (checkResponse.data.code === 200) {
        alert("사용 가능한 닉네임입니다!");
        setIsNicknameChecked(true);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      console.error("중복 확인 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      setIsNicknameChecked(false);
    }
  };

  // 프로필 저장
  const handleSave = async () => {
    if (!isNicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    try {
      console.log("프로필 저장 요청 데이터:", {
        nickname: formData.nickname,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      });

      const saveResponse = await axios.put(
        "http://15.164.139.247:8080/mypage",
        {
          nickname: formData.nickname,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
    setIsNicknameChecked(true);
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
            <InputRow>
              <Label>닉네임</Label>
              <CheckButton onClick={handleCheckNickname}>중복 확인</CheckButton>
            </InputRow>
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
            <Label>전화번호</Label>
            <Input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
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
          <EditButton onClick={handleSave} disabled={!isNicknameChecked}>
            수정하기
          </EditButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ButtonContainer>
      </ContentContainer>
    </Wrapper>
  );
}
