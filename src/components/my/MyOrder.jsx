import { useEffect, useState } from "react";

import styled from "styled-components";

import PaginationBar from "../common/PaginationBar.jsx";

import axios from "axios";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
`;

const OrderList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const OrderCard = styled.div`
  width: 700px;
  height: 110px;
  background: var(--light-gray);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrderBold = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 2px 0 0 0;
`;

const OrderGray = styled.p`
  font-size: 15px;
  color: gray;
  margin: 2px 0 0 0;
`;

const P = styled.p`
  font-size: 18px;
  color: gray;
  margin: 2px 0 2px 0;
`;

const OrderLine = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: gray;
  text-decoration: line-through;
  margin: 2px 0 0 0;
`;

const OrderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const OrderRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PaginationContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px; /* 화면 하단에서 20px 떨어지게 */
`;

export default function MyOrder({}) {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]); // 주문 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalItems, setTotalItems] = useState(10); // 전체 데이터 개수
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 개수
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API 호출 함수
    const fetchOrders = async (page) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/order/list?page=${currentPage - 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 인증 헤더 추가
            },
          }
        );
        console.log("주문 응답 데이터:", response.data);
        setOrders(response.data.data.content);
        setTotalItems(response.data.data.totalElements);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
      setLoading(false);
    };
    fetchOrders(currentPage);
  }, [currentPage]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}.${day}`;
  };

  return (
    <Wrapper>
      <OrderList>
        {orders.map((data) => (
          <OrderCard key={data.ordersId}>
            <OrderTop>
              <OrderBold>배송완료</OrderBold>
              <OrderGray>{formatDate(data.purchaseDate)} 주문</OrderGray>
            </OrderTop>
            <OrderGray>주문번호 {data.ordersId}</OrderGray>
            <P>{data.productName}</P>
            <OrderRow>
              <OrderBold>{data.finalPrice}원</OrderBold>&nbsp;&nbsp;
              <OrderLine>{data.price}원</OrderLine>
            </OrderRow>
          </OrderCard>
        ))}
      </OrderList>

      <PaginationContainer>
        {/* 페이지네이션 */}
        <PaginationBar
          currentPage={currentPage + 1} // currentPage에 1을 더한 값을 전달
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          handlePageChange={(pageNumber) => setCurrentPage(pageNumber)} // 그냥 그대로 설정
        ></PaginationBar>
      </PaginationContainer>
    </Wrapper>
  );
}
