import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PartyModal from "./PartyModal";
import axios from "axios";

export default function Parties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(
          `http://15.164.139.247:8080/product/${productId}/party`
        );
        setParties(response.data.data);
      } catch (err) {
        setError("파티 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [productId, refreshTrigger]);

  const handleCreateParty = () => {
    if (!token) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  //파티 생성, 조인인 후 트리거 변경하여 useEffect 실행
  const handlePartyCreated = () => {
    setRefreshTrigger((prev) => !prev);
  };

  const handleTotalParties = () => {
    navigate(`/product/${productId}/party`);
  };

  const handleJoinGroup = async (partyId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `/party/${partyId}/join`,
        {},
        { headers }
      );
      console.log(response.data);
      alert(`파티에 참여하였습니다.`);
      setRefreshTrigger((prev) => !prev);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <GroupContainer>
      <GroupWrapper>
        <TitleContainer>
          <TitleWrapper>
            <h3>공동구매 참여하기</h3>
          </TitleWrapper>
          <PartyWrapper>
            <PartyBtn onClick={handleCreateParty}>파티 만들기</PartyBtn>
            <PartyBtn onClick={handleTotalParties}>파티 전체보기</PartyBtn>
          </PartyWrapper>
        </TitleContainer>
        {parties.slice(0, 5).map((item) => (
          <GroupItem key={item.partyId}>
            <GroupName>
              {item.partyName} ({item.joinCount}/{item.option})
            </GroupName>
            {item.joinCount === item.option ? (
              <GroupStatus completed>공동구매완료</GroupStatus>
            ) : (
              <>
                <JoinButton onClick={() => handleJoinGroup(item.partyId)}>
                  주문참여
                </JoinButton>
              </>
            )}
          </GroupItem>
        ))}
        <PartyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={productId}
          onPartyCreated={handlePartyCreated}
        />
      </GroupWrapper>
    </GroupContainer>
  );
}

//style
const GroupContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GroupWrapper = styled.div`
  margin: 40px 0px;
  width: 60%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div``;

const PartyWrapper = styled.div`
  display: flex;
`;

const PartyBtn = styled.button`
  width: 150px;
  height: 45px;
  background: var(--sub-main);
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  margin: 10px 0px 0px 15px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    height: 40px;
  }
`;

const GroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const GroupName = styled.div`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const GroupStatus = styled.div`
  font-size: 14px;
  color: ${({ completed }) => (completed ? "gray" : "red")};
`;

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
