import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PartyModal from "./PartyModal";
import mockData from "../../data/mockData3";

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

const PartyBtn = styled.button``;

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
export default function Parties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleTotalParties = () => {
    navigate(`/product/${productId}/party`);
  };

  const handleJoinGroup = (group_id) => {
    alert(`Group ${group_id}에 참여하였습니다.`);
  };

  return (
    <GroupContainer>
      <GroupWrapper>
        <TitleWrapper>
          <h3>공동구매 참여하기</h3>
          <PartyBtn onClick={() => setIsModalOpen(true)}>파티 만들기</PartyBtn>
          <PartyBtn onClick={handleTotalParties}>파티 전체보기</PartyBtn>
        </TitleWrapper>
        {mockData.slice(0, 5).map((item) => (
          <GroupItem key={item.partyId}>
            <GroupName>
              {item.partyName} ({item.joinCount}/{item.capacity})
            </GroupName>
            {item.joinCount === item.capacity ? (
              <GroupStatus completed>공동구매완료</GroupStatus>
            ) : (
              <>
                <GroupStatus>남은시간</GroupStatus>
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
        />
      </GroupWrapper>
    </GroupContainer>
  );
}
