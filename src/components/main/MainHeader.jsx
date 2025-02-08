import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice"; // setToken 액션

export default function MainHeader() {
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
    navigate("/");
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
          <SearchBarContainer>
            <SearchBar>
              <input type="text" placeholder="상품 검색..." />
            </SearchBar>
            <SearchIcon a href="#" />
          </SearchBarContainer>
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

const SearchBarContainer = styled.div`
  position: relative;
  width: 50%;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    padding: 12px;
    font-size: 16px;
    border: 2px solid #e2e2e2;
    border-radius: 8px;
    width: 100%;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #6bae45;
    }
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #6bae45;
  font-size: 1.2rem;
  cursor: pointer;
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
`;

