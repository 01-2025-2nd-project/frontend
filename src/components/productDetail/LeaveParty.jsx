import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LeaveParty({ partyId, onLeave }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLeaveParty = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://15.164.139.247:8080/party/${partyId}/join`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("파티에서 탈퇴되었습니다.");
      onLeave(); // ✅ 탈퇴 후 부모 컴포넌트에서 UI 업데이트 실행
    } catch (error) {
      console.error("파티 탈퇴 오류:", error);
      alert("파티 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return <LeavePartyBtn onClick={handleLeaveParty}>파티 나가기</LeavePartyBtn>;
}

const LeavePartyBtn = styled.button`
  padding: 10px 10px;
  background: #8b0000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    height: 35px;
  }
`;
