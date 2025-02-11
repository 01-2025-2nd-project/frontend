import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PartyModal from "./PartyModal";
import axios from "axios";
import useAuthUser from "../../hooks/useAuthUser";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Parties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParty, setEditingParty] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef();

  const userId = useAuthUser();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(
          `http://15.164.139.247:8080/product/${productId}/party`
        );

        // partyMaster가 userId와 일치하면 isOwner: true
        const partiesWithOwnership = response.data.data.map((party) => ({
          ...party,
          isOwner: String(party.partyMaster) === String(userId),
        }));
        console.log("백엔드에서 받은 데이터:", response.data);
        console.log(userId);
        setParties(partiesWithOwnership);
      } catch (err) {
        setError("파티 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [productId, refreshTrigger, userId]);

  // 메뉴 바깥 클릭 감지 로직
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(null); // 메뉴 바깥 클릭 시 닫기
      }
    };

    if (menuOpen !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

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
  };

  const handleTotalParties = () => {
    navigate(`/product/${productId}/party`);
  };

  const handleJoinGroup = async (partyId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `http://15.164.139.247:8080//party/${partyId}/join`,
        {},
        { headers }
      );
      console.log(response.data);
      console.log(partyId, "파티아이디");
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

  // 파티 삭제 함수
  const handleDeleteParty = async (partyId) => {
    if (!window.confirm("정말로 이 파티를 삭제하시겠습니까?")) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(`http://15.164.139.247:8080/party/${partyId}`, {
        headers,
      });
      alert("파티가 성공적으로 삭제되었습니다.");
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error("파티 삭제 실패:", error.response?.data || error.message);
      alert("파티 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // "점세개 버튼" 클릭 시 메뉴 표시
  const toggleMenu = (partyId) => {
    setMenuOpen(menuOpen === partyId ? null : partyId);
  };

  // "파티 수정" 버튼 클릭 → 모달을 수정 모드로 열기
  const handleEditParty = (party) => {
    setEditingParty(party);
    setIsModalOpen(true);
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
              ) : (
                <>
                  <JoinButton onClick={() => handleJoinGroup(item.partyId)}>
                    주문참여
                  </JoinButton>
                </>
              )}
              {/* {item.isOwner && ( */}
              <MoreOptionsContainer ref={menuRef}>
                <MoreOptionsButton onClick={() => toggleMenu(item.partyId)}>
                  <BsThreeDotsVertical />
                </MoreOptionsButton>

                {menuOpen === item.partyId && (
                  <MoreOptionsMenu>
                    <MenuItem onClick={() => handleEditParty(item)}>
                      파티 수정
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteParty(item.partyId)}>
                      파티 삭제
                    </MenuItem>
                  </MoreOptionsMenu>
                )}
              </MoreOptionsContainer>
              {/* )} */}
            </OptionBtnWrapper>
          </GroupItem>
        ))}
        <PartyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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

const MoreOptionsContainer = styled.div`
  position: relative;
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const MoreOptionsMenu = styled.div`
  position: absolute;
  white-space: nowrap;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10px);
  background: white;
  border: 1px solid #ccc;
  z-index: 10;

  @media (max-width: 768px) {
    left: 0px;
  }
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background: white;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
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
