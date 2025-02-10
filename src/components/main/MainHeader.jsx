import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice"; // setToken 액션
import SearchBar from "./SearchBar";

export default function MainHeader({ setSearchParams, setSearchResults }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // Redux에서 token 가져오기
  const dispatch = useDispatch(); // dispatch를 사용하여 액션 실행

  // useEffect로 localStorage에서 token을 가져와 Redux에 설정
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(setToken(token)); // localStorage에서 가져온 token을 Redux에 설정
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setToken(null)); // 로그아웃 시 token을 null로 설정
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/?page=1");
  };

  const handleMypageClick = () => {
    navigate("/my");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <StyledHeader>
      <Logo onClick={handleLogoClick}>
        <img src="/Farmplus_logo.png" alt="FarmPlus Logo" />
      </Logo>

      <HeaderBarContainer>
        <SearchBarWrapper>
          <SearchBar
            setSearchParams={setSearchParams}
            setSearchResults={setSearchResults}
          />
          <NavLinks>
            {token ? (
              <>
                {/* 로그인 상태일 때 표시할 버튼들 */}
                <Button onClick={handleMypageClick}>MY</Button>
                <Button onClick={handleLogout}>로그아웃</Button>
              </>
            ) : (
              <>
                {/* 로그인 안 되었을 때 표시할 버튼들 */}
                <Button onClick={handleLoginClick}>로그인</Button>
                <Button onClick={handleSignupClick}>회원가입</Button>
              </>
            )}
          </NavLinks>
        </SearchBarWrapper>
      </HeaderBarContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 200px;
    margin-right: 10px;
  }
`;

const HeaderBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  font-weight: bold;

  a {
    color: var(--main);
    text-decoration: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 20px;
  padding: 3px;
  font-size: 20px;
  font-weight: bold;
  color: var(--main);

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
