import styled from "styled-components";
import DeleteUserButton from "./DeleteUserButton";

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
  background: #f4f4f4;
  border-radius: 15px;

  &:hover {
    background: var(--main);
    color: white;
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export default function SideBar({ onTabChange }) {
  return (
    <>
      <Wrapper>
        <MenuContainer>
          <Menus onClick={() => onTabChange("my-info")}>회원정보</Menus>
          <Menus onClick={() => onTabChange("my-party")}>나의 팟</Menus>
          <Menus onClick={() => onTabChange("my-order")}>구매목록</Menus>
        </MenuContainer>
      </Wrapper>
    </>
  );
}
