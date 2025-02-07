import { useEffect, useState } from "react";

import SideBar from "../components/my/SideBar.jsx";
import MyOrder from "../components/my/MyOrder";
import MyParty from "../components/my/MyParty";
import styled from "styled-components";
import MyInfo from "../components/my/MyInfo.jsx";
import { useNavigate } from "react-router-dom";
import { HiOutlineBellAlert } from "react-icons/hi2";
import DeleteUserButton from "../components/my/DeleteUserButton.jsx";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  background: var(--light-green);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 80px;
    margin-right: 10px;
  }
`;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 40px;
  gap: 20px;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: var(--main);
`;

const Icon = styled(HiOutlineBellAlert)`
  width: 20px;
  height: 20px;
`;

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-info");

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "my-info":
        return <MyInfo />;
      case "my-order":
        return <MyOrder />;
      case "my-party":
        return <MyParty />;

      default:
        return <MyInfo />;
    }
  };

  return (
    <Wrapper>
      <Header>
        <Logo onClick={handleLogoClick}>
          <img src="/Farmplus_logo.png" alt="FarmPlus Logo" />
        </Logo>
        <ButtonContainer>
          <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
          <DeleteUserButton></DeleteUserButton>
          <Icon />
        </ButtonContainer>
      </Header>
      <SideBar onTabChange={(tab) => setActiveTab(tab)} />
      <Content>{renderContent()}</Content>
    </Wrapper>
  );
}
