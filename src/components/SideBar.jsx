import { useState } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  position: fixed; /* 화면에 고정 */
  left: 0;
  top: 0;
  width: ${(props) => (props.onOff ? "0px" : "300px")};
  height: 100vh;
  background: #000000;
  transition: width 0.1s ease-out, opacity 0.1s ease-out;
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
  opacity: ${(props) => (props.onOff ? "0" : "1")}; /* 내용 숨기기 */
  display: flex;
  justify-content: center;
  z-index: 1000; /* 다른 콘텐츠 위에 표시 */
`;

const FiMenuIcon = styled(FiMenu)`
  position: fixed; /* 버튼도 고정 */
  left: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 1100; /* 사이드바보다 위에 배치 */
  color: ${(props) => (props.onOff ? "black" : "white")};
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
    <>
      <Wrapper>
        <Content onOff={onOff}>
          <MenuContainer>
            <Menus>홈</Menus>
            <Menus onClick={() => onTabChange("my-info")}>회원정보</Menus>
            <Menus onClick={() => onTabChange("my-party")}>나의 팟</Menus>
            <Menus onClick={() => onTabChange("my-order")}>구매목록</Menus>
          </MenuContainer>
        </Content>
        <FiMenuIcon onOff={onOff} onClick={handleOnOff} />
      </Wrapper>
    </>
  );
}
