import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: ${(props) => (props.onOff ? "300px" : "0px")};
  height: 100vh;
  background: #000000;
  transition: width 0.1s ease-out, opacity 0.1s ease-out;
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
  opacity: ${(props) => (props.onOff ? "1" : "0")}; /* 내용 숨기기 */
  display: flex;
  justify-content: center;
`;

const OnOffButton = styled.button`
  width: 50px;
  height: 30px;

  background: #d9d9d7;
`;

const MenuContainer = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

const Menus = styled.li`
  background: #d9d9d7;
  list-style: none;
  display: flex;
  padding: 5px;
  width: 200px;
  margin-bottom: 2px;
`;

export default function SideBar({ onTabChange }) {
  const [onOff, setOnOff] = useState(true);

  const handleOnOff = () => {
    setOnOff((prev) => !prev);
  };

  return (
    <Wrapper>
      <Content onOff={onOff}>
        <MenuContainer>
          <Menus>홈</Menus>
          <Menus onClick={() => onTabChange("my-info")}>회원정보</Menus>
          <Menus onClick={() => onTabChange("my-party")}>나의 팟</Menus>
          <Menus onClick={() => onTabChange("my-order")}>구매목록</Menus>
        </MenuContainer>
      </Content>
      <OnOffButton onClick={handleOnOff}>{onOff ? "닫기" : "열기"}</OnOffButton>
    </Wrapper>
  );
}
