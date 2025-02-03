import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PaginationBar from "../common/PaginationBar";
import { FiMenu } from "react-icons/fi";
import { mockData } from "../../data/mockData2.js";

const Wrapper = styled.div`
  width: 100vw
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const MenuContainer = styled.div`
  height: 100vh;
  margin-right: 20px;

  background: black;
`;

const ContentContainer = styled.div`
  width: 100vw;
  height: 100%;
  margin: 10px;
`;

const PaginationContainer = styled.div`
  width: ${(props) => (props.onOff ? "100%" : "calc(100% - 300px)")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px; /* 화면 하단에서 20px 떨어지게 */
`;

const FiMenuIcon = styled(FiMenu)`
  left: 10px;
  top: 10px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: white;
`;

const Title = styled.h1`
  margin: 0px;
`;

const Divider = styled.hr`
  display: flex;
  margin-left: 0;
  width: 100%
  color: black;

  
`;
const OrderList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5개의 컬럼 */
  grid-gap: 20px; /* 카드들 사이에 간격 */
`;

const OrderCard = styled.div`
  height: 200px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 10px;
`;

const Bold = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const StatusChip = styled.span`
  width: 110px;
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

const Span = styled.span`
  font-size: 15px;
  color: gray;
`;

export default function MyParty({ handleOnOff, onOff }) {
  const token = localStorage.getItem("token");

  const [parties, setParties] = useState([]); // 주문 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalItems, setTotalItems] = useState(30); // 전체 데이터 개수
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 개수
  const [loading, setLoading] = useState(false);

  // const fetchParties = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/party/list?page=${page}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // 인증 헤더 추가
  //       },
  //     });
  //     setParties(response.data.partyList);
  //     setTotalItems(response.data.totalItems);
  //   } catch (error) {
  //     console.error("데이터 불러오기 실패:", error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchParties(currentPage);
  // }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Wrapper onOff={onOff}>
      <MenuContainer>
        <FiMenuIcon onClick={handleOnOff} />
      </MenuContainer>

      <ContentContainer>
        <Title>파티 목록</Title>
        <Divider></Divider>

        <OrderList>
          {mockData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((data) => (
              <OrderCard key={data.partyId}>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  <StatusChip>{data.status}</StatusChip>

                  <JoinChip>
                    {data.joinCount}/{data.capacity}
                  </JoinChip>
                </div>

                <Bold>{data.partyName}</Bold>
                <Span>&nbsp;by {data.partyMember.partyMasterName}</Span>
                <p>제품명: {data.productName} </p>
                <p>
                  파티 멤버: &nbsp;
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
                </p>
              </OrderCard>
            ))}
        </OrderList>
        <PaginationContainer onOff={onOff}>
          {/* 페이지네이션 */}
          <PaginationBar
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          ></PaginationBar>
        </PaginationContainer>
      </ContentContainer>
    </Wrapper>
  );
}
