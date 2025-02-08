import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import PaginationBar from "../common/PaginationBar.jsx";

import { FiMenu } from "react-icons/fi";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px; /* 화면 하단에서 20px 떨어지게 */
`;

const OrderList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5개의 컬럼 */
  grid-gap: 20px; /* 카드들 사이에 간격 */
`;

const OrderCard = styled.div`
  width: 250px;
  height: 200px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bold = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const StatusChip = styled.span`
  width: 110px;
  height: 30px;
  border-radius: 15px;
  background: var(--light-green);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  margin: 0px;
`;

const JoinChip = styled.span`
  width: 50px;
  height: 30px;
  border-radius: 15px;
  background: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  margin: 0px;
`;

const P = styled.p`
  font-size: 15px;
  color: gray;
`;

const Content = styled.p`
  font-size: 15px;
  color: black;
  margin: 0;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 2px;
`;

export default function MyParty({ onOff }) {
  const token = localStorage.getItem("token");

  const [parties, setParties] = useState([]); // 주문 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalItems, setTotalItems] = useState(30); // 전체 데이터 개수
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 개수
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://15.164.139.247:8080/party/list?page=${currentPage - 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 인증 헤더 추가
            },
          }
        );
        console.log("파티 응답 데이터:", response.data);
        setParties(response.data.data.content);
        setTotalItems(response.data.data.totalElements);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
      setLoading(false);
    };

    fetchParties(currentPage);
  }, [currentPage, token]);

  return (
    <Wrapper>
      <ContentContainer>
        <OrderList>
          {parties.map((data) => (
            <OrderCard key={data.partyId}>
              <ChipContainer>
                <StatusChip>{data.status}</StatusChip>

                <JoinChip>{data.joinCount}명 참여 중!</JoinChip>
              </ChipContainer>

              <Bold>{data.partyName}</Bold>
              <P>by {data.partyMember.partyMasterName}</P>
              <Content>제품 | {data.productName} </Content>
              <Content>
                파티 멤버 | &nbsp;
                {data.partyMember.partyMemberName.length > 0 ? (
                  data.partyMember.partyMemberName.map((member, index) => (
                    <span key={index}>
                      {member.name}
                      {index < data.partyMember.partyMemberName.length - 1 &&
                        ", "}
                    </span>
                  ))
                ) : (
                  <span>없음</span>
                )}
              </Content>
              <Content>마감 | &nbsp;{data.endDate}</Content>
            </OrderCard>
          ))}
        </OrderList>
        <PaginationContainer onOff={onOff}>
          {/* 페이지네이션 */}
          <PaginationBar
            currentPage={currentPage + 1} // currentPage에 1을 더한 값을 전달
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={(pageNumber) => setCurrentPage(pageNumber)} // 그냥 그대로 설정
          ></PaginationBar>
        </PaginationContainer>
      </ContentContainer>
    </Wrapper>
  );
}
