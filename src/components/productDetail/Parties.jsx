import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PartyModal from "./PartyModal";
import axios from "axios";
import useAuthUser from "../../hooks/useAuthUser";
import PartyOptions from "./PartyOptions";
import JoinParty from "./JoinParty";
import LeaveParty from "./LeaveParty";

export default function Parties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParty, setEditingParty] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const userId = useAuthUser();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchParties = async () => {
      try {

        //  1. 해당 상품의 모든 파티 가져오기
        const response = await axios.get(
          `http://15.164.139.247:8080/product/${productId}/party`
        );


        //  2. 내가 참여한 모든 파티 가져오기 (페이지네이션 해결)
        const fetchAllUserParties = async () => {
          let allUserParties = [];
          let page = 0;
          let totalPages = 1;

          while (page < totalPages) {
            const res = await axios.get(
              `http://15.164.139.247:8080/party/list?page=${page}&size=10`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const { content, totalPages: fetchedTotalPages } = res.data.data;
            allUserParties = [...allUserParties, ...content]; // ✅ 모든 데이터 병합
            totalPages = fetchedTotalPages; // ✅ 전체 페이지 수 업데이트
            page++;
          }

          return allUserParties;
        };

        const userJoinedParties = await fetchAllUserParties();

        console.log(
          "✅ 내가 참여한 모든 파티 ID:",
          userJoinedParties.map((p) => p.partyId)
        );

        // ✅ 3. `isOwner`, `isJoined` 속성 추가
        const partiesWithOwnership = response.data.data.map((party) => ({
          ...party,
          isOwner: String(party.partyMaster) === String(userId),
          isJoined: userJoinedParties.some((p) => p.partyId === party.partyId), // ✅ 정확한 isJoined 판별
        }));

        setParties(partiesWithOwnership);
      } catch (err) {
        setError("파티 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [productId, refreshTrigger, userId]);

  const handleCreateParty = () => {
    if (!token) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }
    setEditingParty(null);
    setIsModalOpen(true);
  };

  //파티 생성, 조인인 후 트리거 변경하여 useEffect 실행
  const handlePartyCreated = () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    setRefreshTrigger((prev) => !prev);
    setEditingParty(null);
    setIsModalOpen(true);
  };

  const handleTotalParties = () => {
    navigate(`/product/${productId}/party`);
  };

  // "파티 수정" 버튼 클릭 → 모달을 수정 모드로 열기
  const handleEditParty = (party) => {
    setEditingParty(party);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingParty(null);
    setIsModalOpen(false);
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
            <OptionBtnWrapper>
              {item.joinCount === item.option ? (
                <GroupStatus completed>공동구매완료</GroupStatus>
              ) : item.isOwner ? (
                <PartyOptions
                  party={item}
                  onEdit={handleEditParty}
                  onDelete={() => setRefreshTrigger((prev) => !prev)}
                />
              ) : item.isJoined ? (
                <LeaveParty
                  partyId={item.partyId}
                  onLeave={() => setRefreshTrigger((prev) => !prev)}
                />
              ) : (
                <JoinParty
                  partyId={item.partyId}
                  onJoin={() => setRefreshTrigger((prev) => !prev)}
                />
              )}
            </OptionBtnWrapper>
          </GroupItem>
        ))}
        <PartyModal
          isOpen={isModalOpen}
          onClose={handleClose}
          productId={productId}
          onPartyCreated={handlePartyCreated}
          editingParty={editingParty}
        />
      </GroupWrapper>
    </GroupContainer>
  );
}

//style
const GroupContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
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

const OptionBtnWrapper = styled.div`
  display: flex;
  align-items: center;
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
