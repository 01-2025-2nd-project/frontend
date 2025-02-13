import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DeleteUserButton() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios
      .delete("http://15.164.139.247:8080/mypage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.clear();
        alert("그동안 이용해주셔서 감사합니다.");
        navigate("/");
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div>
      <DeleteButton onClick={() => setIsModalOpen(true)}>탈퇴하기</DeleteButton>

      {isModalOpen && (
        <Modal>
          <ModalBody>
            <ModalTitle>회원 탈퇴</ModalTitle>
            <ModalContent>정말로 탈퇴하시겠습니까?🥹</ModalContent>
            <ButtonContainer>
              <ConfirmButton onClick={handleDeleteUser}>확인</ConfirmButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>
                취소
              </CancelButton>
            </ButtonContainer>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  width: 400px;
  height: 200px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h4`
  margin: 0;
`;
const ModalContent = styled.p``;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  gap: 5px;
`;

const ConfirmButton = styled.button`
  width: 60px;
  height: 30px;
  background: var(--main);
  border: none;
  border-radius: 15px;
  color: white;
`;

const CancelButton = styled.button`
  width: 60px;
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 15px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  font-size: 15px;
  font-weight: bold;
  color: var(--main);
`;
