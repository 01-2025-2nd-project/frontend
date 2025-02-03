import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    height: 100px;
    margin-right: 10px;
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
    </StyledHeader>
  );
}
