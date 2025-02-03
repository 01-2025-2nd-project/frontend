import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

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
  width: 80%;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 60%;
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

export default function Header() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
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
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </NavLinks>
        </SearchBarWrapper>
        <CategoryMenu />
      </HeaderBarContainer>
    </StyledHeader>
  );
}
