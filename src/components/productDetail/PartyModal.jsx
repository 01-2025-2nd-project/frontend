import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 360px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CloseButton = styled.button`
  padding: 10px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: var(--main);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function PartyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    partyName: "",
    partyMaster: "",
    optionId: "",
    productName: "",
    day: "",
    capacity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/party", formData);
      alert("파티가 성공적으로 생성되었습니다.");
      console.log(response.data);
    } catch (error) {
      console.error("파티 생성 실패:", error);
      alert("파티 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h4>파티 만들기</h4>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="partyName"
              placeholder="파티 이름"
              value={formData.partyName}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="optionId"
              placeholder="옵션 ID"
              value={formData.optionId}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="duration"
              placeholder="기간"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="capacity"
              placeholder="최대 인원"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
            <ModalActions>
              <CloseButton onClick={onClose}>닫기</CloseButton>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "생성 중..." : "생성"}
              </SubmitButton>
            </ModalActions>
          </form>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}
