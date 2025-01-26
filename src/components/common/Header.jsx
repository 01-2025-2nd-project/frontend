import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff6304;
  color: white;
  padding: 10px 20px;
`;

const HeaderLeft = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const HeaderRight = styled.div`
  a {
    color: white;
    text-decoration: none;
    margin-left: 15px;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLeft>Shopping Mall</HeaderLeft>
      <HeaderRight>
        <a href="#">회원가입</a>
        <a href="#">로그인</a>
      </HeaderRight>
    </HeaderContainer>
  );
}
