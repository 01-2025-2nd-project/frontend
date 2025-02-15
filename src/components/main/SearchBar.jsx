import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import mockData from "../../data/mockData";

export default function SearchBar({ setSearchParams, setSearchResults }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `http://15.164.139.247:8080/product/search?keyword=${keyword}&page=0`
      );

      const searchResults = response.data.data.content;

      const updatedResults = searchResults.map((product) => {
        const matchedMock = mockData.find(
          (item) => item.productId === product.productId
        );
        return {
          ...product,
          image: matchedMock ? matchedMock.image : "/image/garlic.jpg", // 기본 이미지 설정 가능
        };
      });

      setSearchResults(updatedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("검색 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="상품 검색..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchIcon onClick={handleSearch} />
    </SearchBarContainer>
  );
}

//style
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
