import { useEffect, useState } from "react";

import SideBar from "../components/my/SideBar.jsx";
import MyOrder from "../components/my/MyOrder";
import MyParty from "../components/my/MyParty";
import styled from "styled-components";
import MyInfo from "../components/my/MyInfo.jsx";
import { useNavigate } from "react-router-dom";
import DeleteUserButton from "../components/my/DeleteUserButton.jsx";
import LogoutButton from "../components/my/LogoutButton.jsx";
import axios from "axios";
import Alert from "../components/common/Alert.jsx";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-info");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log("token:", token);

  useEffect(() => {

    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/mypage", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("응답 데이터:", response.data);

        if (response.data && response.data.data) {

    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/api/mypage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("응답 데이터:", response.data);

          setEmail(response.data.data.email);
        } else {
          console.error("서버 응답 데이터에 'data'가 없습니다:", response.data);
        }
      } catch (err) {
        console.error("마이페이지 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []); // token 변경 시 실행

  useEffect(() => {
    console.log("마이페이지에서 내려줄 이메일:", email);
  }, []);

  const handleLogoClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");

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

  // ✅ 로그인되지 않은 경우 빈 화면을 렌더링 (Hook 순서를 유지)
  if (!token) return null;

  return (
    <Wrapper>
      <Header>
        <Logo onClick={handleLogoClick}>
          <img src="/Farmplus_logo.png" alt="FarmPlus Logo" />
        </Logo>
        <ButtonContainer>
          {token ? (
            <>
              <LogoutButton />
              <DeleteUserButton />
              <Alert email={email} />
            </>
          ) : (
            <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
          )}
        </ButtonContainer>
      </Header>
      <SideBar onTabChange={setActiveTab} />
      <Content>{renderContent()}</Content>
    </Wrapper>
  );
}

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
