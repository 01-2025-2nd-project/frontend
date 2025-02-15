import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import mockData from "../../data/mockData";
import CategoryMenu from "./CategoryMenu";
import MainHeader from "./MainHeader";
import PaginationBar from "../common/PaginationBar";

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10); // 페이지당 아이템 개수
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://15.164.139.247:8080/product", {
          params: {
            sort,
            page,
            category,
            keyword,
            size: itemsPerPage, // 페이지당 아이템 개수 설정
          },
        });

        if (response.data.code === 200) {
          const mockDataMap = mockData.reduce((acc, item) => {
            acc[item.productId] = item.image;
            return acc;
          }, {});

          const products = response.data.data.content.map((item) => ({
            ...item,
            image: mockDataMap[item.productId] || "/image/garlic.jpg",
          }));

          setItems(products);
          setTotalItems(response.data.data.totalElements); // 전체 아이템 개수 설정
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [page, sort, category, keyword]);

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, keyword });
  };

  return (
    <>
      <MainHeader
        setSearchResults={setItems}
        setSearchParams={setSearchParams}
      />
      <CategoryMenu
        setSort={setSort}
        setProducts={setItems}
        setSearchParams={setSearchParams}
      />
      <ItemGrid>
        {items.map((item) => (
          <Item
            key={item.productId}
            onClick={() => handleItemClick(item.productId)}
          >
            <img src={item.image} alt={item.productName} />
            <ItemTitle>{item.productName}</ItemTitle>
            <ItemPrice>{formatPrice(item.price)}원</ItemPrice>
          </Item>
        ))}
      </ItemGrid>
      <PaginationBar
        currentPage={page}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

//style
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
