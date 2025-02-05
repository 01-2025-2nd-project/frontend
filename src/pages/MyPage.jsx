import { useEffect, useState } from "react";

import SideBar from "../components/my/SideBar.jsx";
import MyOrder from "../components/my/MyOrder";
import MyParty from "../components/my/MyParty";
import styled from "styled-components";
import axios from "axios";
import MyInfo from "../components/my/MyInfo";

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
