import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import mockData from "../../data/mockData";
import CategoryMenu from "./CategoryMenu";
import MainHeader from "./MainHeader";

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const Item = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const ItemTitle = styled.div`
  font-size: 16px;
  margin: 10px 0;
`;

const ItemPrice = styled.div`
  color: #54451a;
  font-weight: bold;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? " #6bae45" : "#f5f5f5")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.disabled || props.active ? null : "#e0e0e0"};
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <PageContainer>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PaginationButton>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationButton
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PaginationButton>
    </PageContainer>
  );
};

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://15.164.139.247:8080/product", {
          params: {
            sort: "default",
            page: 1,
            category: "",
          },
        });

        if (response.data.code === 200) {
          const mockDataMap = mockData.reduce((acc, item) => {
            acc[item.productId] = item.image; // productId를 키로 매핑
            return acc;
          }, {});

          const products = response.data.data.content.map((item) => ({
            ...item,
            image: mockDataMap[item.productId] || "/image/garlic.jpg",
          }));

          setItems(products);
          setTotalPages(response.data.data.totalPages);
          console.log("Fetched Products:", products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [page, sort, category]);

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <MainHeader setPage={setPage} />
      <CategoryMenu setSort={setSort} setProducts={setItems} />
      <ItemGrid>
        {items.map((item) => (
          <Item
            key={item.productId}
            onClick={() => handleItemClick(item.productId)}
          >
            <img src={item.image} alt={item.productName} />
            <ItemTitle>{item.productName}</ItemTitle>
            <ItemPrice>{item.price}원</ItemPrice>
          </Item>
        ))}
      </ItemGrid>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
}
