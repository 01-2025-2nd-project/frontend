import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  left: 0;
  top: 0;
  width: ${(props) => (props.onOff ? "0px" : "300px")};
  height: 100vh;
  background: #d9d9d7;
  transition: width 0.1s ease-out, opacity 0.1s ease-out;
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
  opacity: ${(props) => (props.onOff ? "0" : "1")}; /* 내용 숨기기 */
  display: flex;
  justify-content: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 300px;
  height: 30px;
  background: #f7f7f7;
`;

export default function SideBar({ onOff, onTabChange }) {
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
      </Wrapper>
    </>
  );
}
