import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/common/Header";
import { useParams } from "react-router-dom";

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
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(
          `http://15.164.139.247:8080/product/${productId}/party`
        );
        setParties(response.data.data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, []);

  return (
    <Container>
      <Header />
      <PartiesContainer>
        <Title>전체 파티 보기</Title>
        <PartiesWrapper>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <PartyList>
              {parties.length > 0 ? (
                parties.map((party) => (
                  <PartyItem key={party.partyId}>
                    <PartyInfo>
                      <PartyName>{party.partyName}</PartyName>
                      <PartyDetails>
                        참여 인원: {party.joinCount}/{party.option}
                      </PartyDetails>
                    </PartyInfo>
                    <Status status={party.status}>{party.status}</Status>
                  </PartyItem>
                ))
              ) : (
                <p>파티가 없습니다.</p>
              )}
            </PartyList>
          )}
        </PartiesWrapper>
      </PartiesContainer>
    </Container>
  );
}
