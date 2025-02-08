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
import { useDispatch, useSelector } from "react-redux";

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

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-info");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // useEffect를 사용하여 컴포넌트가 처음 렌더링될 때 GET 요청을 보냄
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://15.164.139.247:8080/mypage",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("응답 데이터:", response.data);
          setEmail(response.data.data.email);
          console.log("마이페이지에서 내려줄 이메일:", email);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    } else {
      navigate("/"); // 로그인 안 되어 있으면 로그인 페이지로 이동
    }
  }, [dispatch, token, navigate]); // token이 바뀌면 실행

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
      <SideBar onTabChange={(tab) => setActiveTab(tab)} />
      <Content>{renderContent()}</Content>
    </Wrapper>
  );
}
