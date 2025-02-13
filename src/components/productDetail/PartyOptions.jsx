import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";

export default function PartyOptions({ party, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const token = localStorage.getItem("token");

  // 메뉴 바깥 클릭 감지 로직
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 파티를 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://15.164.139.247:8080/party/${party.partyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("파티가 성공적으로 삭제되었습니다.");
      onDelete();
    } catch (error) {
      console.error("파티 삭제 실패:", error.response?.data || error.message);
      alert("파티 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <MoreOptionsContainer ref={menuRef}>
      <MoreOptionsButton onClick={toggleMenu}>
        <BsThreeDotsVertical />
      </MoreOptionsButton>
      {menuOpen && (
        <MoreOptionsMenu>
          <MenuItem onClick={() => onEdit(party)}>파티 수정</MenuItem>
          <MenuItem onClick={handleDelete}>파티 삭제</MenuItem>
        </MoreOptionsMenu>
      )}
    </MoreOptionsContainer>
  );
}

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
