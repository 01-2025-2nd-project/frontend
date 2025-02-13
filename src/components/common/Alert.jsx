import { use, useState } from "react";
import useWebsocket from "../../hooks/useWebsocket";
import { HiOutlineBellAlert } from "react-icons/hi2";
import styled from "styled-components";
import axios from "axios";

export default function Alert({ email }) {
  const notifications = useWebsocket({ email });
  console.log("알림 : ", notifications);
  const token = localStorage.getItem("token");

  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // 모두 읽음 처리 함수
  const markAsRead = async () => {
    if (notifications.length === 0) return;

    // 1. 현재 보이는 알림들의 ID 목록 가져오기
    const notificationIds = notifications.map((n) => n.notificationId);

    let url = "";

    // 2. ID를 URL 쿼리 파라미터 형식으로 변환
    if (notificationIds.length > 0) {
      const firstId = notificationIds[0];
      const lastId = notificationIds[notificationIds.length - 1];

      // 3. URL 쿼리 파라미터 생성
      url = `http://15.164.139.247:8080/notification/read?notification-id=${firstId}&notification-id=${lastId}`;
    }

    try {
      // 4. PUT 요청 보내기
      const response = await axios.put(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("알림 읽음 처리 성공 ");

        notifications.length = 0; // notifications 배열을 빈 배열로 만듦

        setShowNotification(false); // 알림 상태 숨기기
      }
    } catch (error) {
      console.error("알림 읽음 처리 실패: ", error);
    }
  };

  return (
    <div>
      {/* 알림 아이콘 */}
      <div>
        <Icon onClick={toggleNotification} />({notifications.length})
      </div>

      {/* 알림 모달 */}
      {showNotification && (
        <>
          <Overlay onClick={toggleNotification} /> {/* 배경 클릭 시 닫힘 */}
          <NotificationWrapper>
            <AlertContainer>
              <span>🔔 알림</span>
              <ButtonContainer>
                <button onClick={markAsRead}>모두 읽음</button>
                <button onClick={toggleNotification}>닫기</button>
              </ButtonContainer>
            </AlertContainer>
            <div>
              {notifications.map((notification) => (
                <div key={notification.notificationId}>
                  <p>{notification.content}</p>
                  <small>{notification.createAt}</small>
                </div>
              ))}
            </div>
          </NotificationWrapper>
        </>
      )}
    </div>
  );
}

const Icon = styled(HiOutlineBellAlert)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 9999; /* 화면 최상위 */
  padding: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0); /* 반투명 배경 */
  z-index: 9998; /* 모달보다 아래 */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const AlertContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
