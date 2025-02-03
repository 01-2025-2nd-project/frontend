import React from "react";
import styled from "styled-components";
import mockData from "../data/mockData3";
import Header from "../components/common/Header";

const Container = styled.div``;
const PartiesContainer = styled.div``;

const PartiesWrapper = styled.div`
  width: 70%;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const PartyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PartyItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const PartyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PartyName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PartyDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const Status = styled.div`
  color: ${({ status }) => (status === "모집 중" ? "var(--main)" : "gray")};
  font-weight: bold;
`;

export default function TotalParties() {
  return (
    <Container>
      <Header />
      <PartiesContainer>
        <Title>전체 파티 보기</Title>
        <PartiesWrapper>
          <PartyList>
            {mockData.map((party) => (
              <PartyItem key={party.partyId}>
                <PartyInfo>
                  <PartyName>{party.partyName}</PartyName>
                  <PartyDetails>
                    옵션: {party.option} | 참여 인원: {party.joinCount}/
                    {party.capacity}
                  </PartyDetails>
                </PartyInfo>
                <Status status={party.status}>{party.status}</Status>
              </PartyItem>
            ))}
          </PartyList>
        </PartiesWrapper>
      </PartiesContainer>
    </Container>
  );
}
