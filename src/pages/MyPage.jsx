import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import MyInfo from "../components/MyInfo";
import MyOrder from "../components/MyOrder";
import MyParty from "../components/MyParty";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%
  display: flex;
  flex-direction: column;
  background: "#f4f4f4";
  height: 100vh;
  overflow: auto;
`;

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-info");
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState(null);
  const [parties, setParties] = useState(null);

  const [onOff, setOnOff] = useState(true);

  const handleOnOff = () => {
    setOnOff((prev) => !prev);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "my-info":
        return <MyInfo handleOnOff={handleOnOff} onOff={onOff} />;
      case "my-order":
        return <MyOrder handleOnOff={handleOnOff} onOff={onOff} />;
      case "my-party":
        return <MyParty handleOnOff={handleOnOff} onOff={onOff} />;

      default:
        return <MyInfo handleOnOff={handleOnOff} onOff={onOff} />;
    }
  };

  return (
    <Wrapper>
      <SideBar
        onOff={onOff}
        handleOnOff={handleOnOff}
        onTabChange={(tab) => setActiveTab(tab)}
      />
      <Content onOff={onOff}> {renderContent()}</Content>
    </Wrapper>
  );
}
