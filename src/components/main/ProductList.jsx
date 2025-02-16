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
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    Number(searchParams.get("page")) >= 0
      ? Number(searchParams.get("page"))
      : 0;
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (keyword) {
          //  검색어가 있을 때는 검색 API 호출
          response = await axios.get(`/api/product/search`, {
            params: { keyword, page: Math.max(page - 1, 0), sort, category },
          });
        } else {
          //  카테고리, 정렬 포함하여 기본 상품 목록 호출
          response = await axios.get("/api/product", {
            params: { page: Math.max(page - 1, 0), category, sort },
          });
        }

        if (response.data.code === 200) {
          //mockData를 객체(Map) 형태로 변환하여 검색 최적화
          const mockDataMap = mockData.reduce((acc, item) => {
            acc[item.productId] = item.image;
            return acc;
          }, {});

          const products = response.data.data.content.map((item) => ({
            ...item,
            image: mockDataMap[item.productId] || "/image/garlic.jpg",
          }));

          setItems(products);
          setTotalItems(response.data.data.totalElements);
          setTotalPages(response.data.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [page, keyword, category, sort]); // ✅ 검색어, 카테고리, 정렬 변경 시 데이터 다시 불러오기

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams((prevParams) => {
        prevParams.set("page", "1"); // ✅ URL에 page=1 추가
        return prevParams;
      });
    }
  }, []);

  const handlePageChange = (newPage) => {
    setSearchParams((prevParams) => ({
      keyword: prevParams.get("keyword") || "",
      category: prevParams.get("category") || "",
      sort: prevParams.get("sort") || "",
      page: newPage,
    }));
  };

  const handleCategoryChange = (newCategory) => {
    setSearchParams((prevParams) => ({
      keyword: prevParams.get("keyword") || "",
      category: newCategory,
      sort: prevParams.get("sort") || "",
      page: 0, // ✅ 카테고리 변경 시 첫 페이지로 이동
    }));
  };

  const handleSortChange = (newSort) => {
    setSearchParams((prevParams) => ({
      keyword: prevParams.get("keyword") || "",
      category: prevParams.get("category") || "",
      sort: newSort,
      page: 0, // ✅ 정렬 변경 시 첫 페이지로 이동
    }));
  };

  return (
    <>
      <MainHeader
        setSearchResults={setItems}
        setSearchParams={setSearchParams}
        setTotalItems={setTotalItems}
        setTotalPages={setTotalPages}
      />
      <CategoryMenu
        setProducts={setItems}
        setSearchParams={setSearchParams}
        setTotalItems={setTotalItems}
        setTotalPages={setTotalPages}
        onCategoryChange={handleCategoryChange} // ✅ 카테고리 변경 핸들러 추가
        onSortChange={handleSortChange} // ✅ 정렬 변경 핸들러 추가
      />
      <ItemGrid>
        {items.map((item) => (
          <Item
            key={item.productId}
            onClick={() => navigate(`/product/${item.productId}`)}
          >
            <img src={item.image} alt={item.productName} />
            <ItemTitle>{item.productName}</ItemTitle>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          </Item>
        ))}
      </ItemGrid>
      {totalPages > 1 && (
        <PaginationBar
          currentPage={page}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
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
