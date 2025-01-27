import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 200px;
    margin-right: 10px;
  }

  h1 {
    font-size: 24px;
    margin: 0;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 18px;
  font-weight: bold;

  a {
    color: #6bae45;
    text-decoration: none;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 40%;
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
const Header = () => {
  return (
    <StyledHeader>
      <Logo>
        <img src="/Farmplus_logo.png" alt="FarmPlus Logo" />
      </Logo>
      <SearchBarContainer>
        <SearchBar>
          <input type="text" placeholder="상품 검색..." />
        </SearchBar>
        <SearchIcon a href="#" />
      </SearchBarContainer>
      <NavLinks>
        <a href="#">로그인</a>
        <a href="#">회원가입</a>
      </NavLinks>
    </StyledHeader>
  );
};

export default Header;
