import axios from "axios";
import styled from "styled-components";

export default function JoinParty({ partyId, onJoin }) {
  const token = localStorage.getItem("token");

  const handleJoinGroup = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`/api/party/${partyId}/join`, {}, { headers });
      alert(`파티에 참여하였습니다.`);
      onJoin();
    } catch (error) {
      if (error.response?.status === 400) {
        alert("이미 참여한 파티입니다.");
      } else {
        console.error(
          "Error joining group:",
          error.response?.data || error.message
        );
        alert("파티 참여에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return <JoinButton onClick={handleJoinGroup}>주문참여</JoinButton>;
}

const JoinButton = styled.button`
  padding: 10px 10px;
  background-color: var(--main);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
