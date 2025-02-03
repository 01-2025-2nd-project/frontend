import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Mock group data
const mockGroupData = [
  {
    group_id: 1,
    name: "정*다",
    members: 1,
    total: 2,
    timeLeft: "12:26:21",
    completed: false,
  },
  { group_id: 2, name: "원*득", members: 2, total: 2, completed: true },
  { group_id: 3, name: "김*석", members: 2, total: 2, completed: true },
  { group_id: 4, name: "고*름", members: 2, total: 2, completed: true },
  { group_id: 5, name: "양*식", members: 2, total: 2, completed: true },
];

const GroupContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const GroupWrapper = styled.div`
  margin-top: 40px;
  width: 60%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TotalPartyBtn = styled.button``;

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
  padding: 5px 10px;
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
  const [groups, setGroups] = useState(mockGroupData);
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
          <TotalPartyBtn onClick={handleTotalParties}>
            파티 전체보기
          </TotalPartyBtn>
        </TitleWrapper>
        {groups.map((group) => (
          <GroupItem key={group.group_id}>
            <GroupName>
              {group.name} ({group.members}/{group.total})
            </GroupName>
            {group.completed ? (
              <GroupStatus completed>공동구매완료</GroupStatus>
            ) : (
              <>
                <GroupStatus>남은시간: {group.timeLeft}</GroupStatus>
                <JoinButton onClick={() => handleJoinGroup(group.group_id)}>
                  주문참여
                </JoinButton>
              </>
            )}
          </GroupItem>
        ))}
      </GroupWrapper>
    </GroupContainer>
  );
}
