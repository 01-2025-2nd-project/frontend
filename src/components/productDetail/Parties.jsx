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

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}/party`);
        setParties(response.data.data);
      } catch (err) {
        setError("파티 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [productId]);

  const handleTotalParties = () => {
    navigate(`/product/${productId}/party`);
  };

  const handleJoinGroup = (groupId) => {
    alert(`Group ${groupId}에 참여하였습니다.`);
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
        <TitleWrapper>
          <h3>공동구매 참여하기</h3>
          <PartyWrapper>
            <PartyBtn onClick={() => setIsModalOpen(true)}>
              파티 만들기
            </PartyBtn>
            <PartyBtn onClick={handleTotalParties}>파티 전체보기</PartyBtn>
          </PartyWrapper>
        </TitleWrapper>
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
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

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
`;

const GroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const GroupName = styled.div`
  font-size: 16px;
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
