import styled from "styled-components";
import DeleteUserButton from "./DeleteUserButton";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gray);
  width: 100vw;
  height: 50px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Menus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  width: 100px;
  height: 20px;
  background: ${(props) => (props.selected ? "var(--main) " : "#f4f4f4")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border-radius: 15px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export default function SideBar({ onTabChange }) {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onTabChange(menu);
  };
  return (
    <>
      <Wrapper>
        <MenuContainer>
          <Menus
            selected={selectedMenu === "my-info"}
            onClick={() => handleMenuClick("my-info")}
          >
            회원정보
          </Menus>
          <Menus
            selected={selectedMenu === "my-party"}
            onClick={() => handleMenuClick("my-party")}
          >
            나의 팟
          </Menus>
          <Menus
            selected={selectedMenu === "my-order"}
            onClick={() => handleMenuClick("my-order")}
          >
            구매목록
          </Menus>
        </MenuContainer>
      </Wrapper>
    </>
  );
}
