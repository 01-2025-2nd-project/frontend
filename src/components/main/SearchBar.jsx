import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import mockData from "../../data/mockData";

export default function SearchBar({
  setSearchResults,
  setTotalItems,
  setTotalPages,
  setKeyword,
  keyword,
}) {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      // ✅ 검색 시 URL 파라미터에 검색어 추가하고 첫 페이지로 초기화
      const newParams = new URLSearchParams(searchParams);
      newParams.set("keyword", keyword);
      newParams.set("page", 0); // ✅ 항상 첫 페이지로 이동
      setSearchParams(Object.fromEntries(newParams.entries())); // ✅ URL 파라미터 업데이트

      const response = await axios.get(

        `http://15.164.139.247:8080/product/search`,
        {
          params: { keyword, page: 0 },
        }

      );

      console.log("전체 페이지 수:", response.data.data.totalPages);

      const searchResults = response.data.data.content;

      const updatedResults = searchResults.map((product) => {
        const matchedMock = mockData.find(
          (item) => item.productId === product.productId
        );
        return {
          ...product,
          image: matchedMock ? matchedMock.image : "/image/garlic.jpg",
        };
      });

      setSearchResults(updatedResults);

      // ✅ setTotalItems, setTotalPages가 존재하는 경우에만 실행
      if (typeof setTotalItems === "function") {
        setTotalItems(response.data.data.totalElements);
      }
      if (typeof setTotalPages === "function") {
        setTotalPages(response.data.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("검색 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  //페이지 이동시 키워드 초기화
  useEffect(() => {
    return () => {
      setKeyword("");
    };
  }, []);
  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="상품 검색..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()} // ✅ Enter 키로 검색 실행
      />
      <SearchIcon onClick={handleSearch} />
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 50%;
`;

const SearchInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e2e2e2;
  border-radius: 8px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6bae45;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #6bae45;
  font-size: 1.2rem;
  cursor: pointer;
`;
