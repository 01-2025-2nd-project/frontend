import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ setSearchParams, setSearchResults }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://15.164.139.247:8080/product/search?keyword=${keyword}&page=1`
      );
      setSearchResults(response.data.data.content);
      console.log(response.data.data.content);
      navigate(`/product/search?keyword=${keyword}&page=1`);
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
