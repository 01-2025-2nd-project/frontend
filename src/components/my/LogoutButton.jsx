import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/authSlice";

const Button = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  font-size: 15px;
  font-weight: bold;
  color: var(--main);
`;

export default function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // dispatch를 사용하여 액션 실행

  const handleLogout = () => {
    dispatch(setToken(null)); // 로그아웃 시 token을 null로 설정
    navigate("/"); //
  };

  return <Button onClick={handleLogout}>로그아웃</Button>;
}
