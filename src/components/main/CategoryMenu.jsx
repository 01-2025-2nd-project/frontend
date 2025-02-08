import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  background-color: #6bae45;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryBar = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CategoryItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: white;

  &:hover {
    font-weight: bold;
  }
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: white;
  color: black;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function CategoryMenu({ setProducts }) {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1); // 기본 페이지 번호

  useEffect(() => {
    // 카테고리 데이터를 백엔드에서 가져오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://15.164.139.247:8080/product/admin/category"
        );
        setCategories(response.data.data);
        console.log(response.data.data, "카테고리");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async ({ sort, category, page }) => {
    try {
      const response = await axios.get("/api/product", {
        params: {
          sort: sort || selectedSort,
          category: category || selectedCategory,
          page: page || 1,
        },
      });
      setProducts(response.data.data); // 부모 컴포넌트에 데이터 전달
      console.log("Filtered Products:", response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = async (category, sort, page) => {
    setSelectedCategory(category);

    try {
      const response = await axios.get("/api/product", {
        params: { category, sort, page },
      });
      setProducts(response.data.data.content);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const handleSortChange = async (sortOption, apiSortValue) => {
    setSelectedSort(sortOption);
    setDropdownOpen(false);
    fetchProducts({ sort: apiSortValue, category: selectedCategory, page });
  };

  const sortOptions = [
    { label: "구매순(많은)", value: "purchaseCount" },
    { label: "가격순(높은)", value: "priceDescending" },
    { label: "가격순(낮은)", value: "priceAscending" },
    { label: "등록순(기본)", value: "createAt" },
  ];

  return (
    <Container>
      <CategoryBar>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            onClick={() => handleCategoryChange(category.name)}
          >
            {category.name}
          </CategoryItem>
        ))}
      </CategoryBar>

      <Dropdown>
        <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedSort} ▾
        </DropdownButton>
        <DropdownContent show={dropdownOpen}>
          {sortOptions.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={() => handleSortChange(option.label, option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </Container>
  );
}
