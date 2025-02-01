import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import "../CSS/Pagination.css";
import axios from "axios";

const Wrapper = styled.div`
  height: 100vh;
  padding-left: 50px;
`;

const OrderList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const OrderCard = styled.div`
  width: 800px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.h1`
  margin-top: 50px;
`;

const Divider = styled.hr`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  color: black;
`;

const OrderBold = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const OrderGray = styled.p`
  font-size: 15px;
  color: gray;
`;

const OrderLine = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: gray;
  text-decoration: line-through;
`;

export default function MyOrder({}) {
  const mockData = [
    {
      ordersId: "주문 id",
      productImg: "aaaaa",
      price: 5000,
      productName: "제품 이름 1",
      option: [
        {
          option_id: 1,
          option: "5명 할인",
          option_price: 0.1,
        },
      ],

      finalPrice: 4500,
      purchaseDate: "2025-01-02",
    },

    {
      ordersId: "주문 id2",
      productImg: "bbbbb",
      price: 2500,
      productName: "제품 이름 2",
      option: [
        {
          option_id: 2,
          option: "10명 할인",
          option_price: 0.15,
        },
      ],

      finalPrice: 2000,
      purchaseDate: "2025-02-02",
    },
  ];

  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]); // 주문 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 데이터 개수
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 개수
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const fetchOrders = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/order/list?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 헤더 추가
        },
      });
      setOrders(response.data.orders);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  // 클릭 시 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}.${day}`;
  };

  return (
    <Wrapper>
      <Title>주문목록</Title>
      <Divider></Divider>

      {/* <div>
        {orders.map((data) => (
          <OrderCard key={data.ordersId}>
            <p>{data.ordersId}</p>
            <p>{data.price}</p>
            <p>{data.finalPrice}</p>
          </OrderCard>
        ))}
      </div> */}

      <OrderList>
        {mockData.map((data) => (
          <OrderCard key={data.ordersId}>
            <OrderBold>배송완료</OrderBold>
            <p>주문번호 {data.ordersId}</p>
            <OrderGray>{formatDate(data.purchaseDate)} 주문</OrderGray>
            <OrderBold>{data.finalPrice}원</OrderBold>&nbsp;&nbsp;
            <OrderLine>{data.price}원</OrderLine>
          </OrderCard>
        ))}
      </OrderList>

      {/* 페이지네이션 */}
      <div>
        <Pagination
          activePage={currentPage} // 현재 페이지
          itemsCountPerPage={itemsPerPage} // 한 페이지당 보여줄 아이템 개수
          totalItemsCount={totalItems} // 전체 데이터 개수
          pageRangeDisplayed={3} // 표시할 페이지 버튼 개수
          onChange={handlePageChange} // 페이지 변경 시 실행되는 함수
          prevPageText={"‹"} // 이전 버튼
          nextPageText={"›"} // 다음 버튼
        ></Pagination>
      </div>
    </Wrapper>
  );
}
