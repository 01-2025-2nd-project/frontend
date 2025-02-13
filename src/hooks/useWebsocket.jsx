import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useEffect, useState } from "react";

const socketUrl = "ws://api/ws";

export default function useWebsocket({ email }) {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  // 1. GET 요청을 통해 알림 목록 받아오기
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://15.164.139.247:8080/notification/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        setNotifications(response.data.data); // 기존 알림 목록 설정
      }
    } catch (error) {
      console.error("알림 목록 가져오기 실패", error);
    }
  };

  // 2, WebSocket 클라이언트 설정
  const stompClient = new Client({
    brokerURL: socketUrl,
    reconnectDelay: 5000,
  });

  // 웹 소켓 서버 연결
  stompClient.onConnect = () => {
    console.log("웹소켓 연결 성공!");

    // 이메일 기반으로 구독
    const topic = `/topic/notifications/${email}`;
    stompClient.subscribe(topic, (message) => {
      // 메시지가 도착하면 알림 상태를 업데이트
      const newNotification = JSON.parse(message.body);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    });
  };

  // 연결 실패 시
  stompClient.onStompError = (error) => {
    console.error("웹소켓 연결 오류", error);
  };

  // 3. 웹 소켓 연결 초기화
  useEffect(() => {
    fetchNotifications();
    stompClient.activate();

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      stompClient.deactivate();
    };
  }, [email]);

  return notifications;
}
