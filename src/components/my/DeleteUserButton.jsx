import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteUserButton() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDeleteUser = (e) => {
    e.preventDefault();
    if (window.confirm("정말 탈퇴하시겠습니다...?")) {
      axios
        .delete("http://15.164.139.247:8080/mypage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          localStorage.clear();
          alert("그동안 이용해주셔서 감사합니다.");
          navigate("/");
        })
        .catch((err) => alert(err.response.data.message));
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-body">
          <h1>제목</h1>
          <p>내용</p>
        </div>
      </div>
      <button onClick={handleDeleteUser}>탈퇴</button>
    </div>
  );
}
