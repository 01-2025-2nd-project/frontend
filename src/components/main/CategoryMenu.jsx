import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import mockData from "../../data/mockData"; // 🔹 Mock 데이터 가져오기

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

export default function CategoryMenu({ setProducts, setSearchParams }) {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // 카테고리 데이터를 백엔드에서 가져오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/product/admin/category");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 MockData와 실제 데이터 매핑하는 함수
  const mapMockImages = (products) => {
    const mockDataMap = mockData.reduce((acc, item) => {
      acc[item.productId] = item.image; // productId를 키로 매핑
      return acc;
    }, {});

    return products.map((item) => ({
      ...item,
      image: mockDataMap[item.productId] || "/images/default.jpg", // 이미지 없으면 기본 이미지
    }));
  };

  // 🔹 상품 데이터 가져오기 (정렬, 카테고리 변경 시)
  const fetchProducts = async ({ sort, category, page }) => {
    try {
      const response = await axios.get("/api/product", {
        params: {
          sort: sort || selectedSort,
          category: category || selectedCategory,
          page: page || 1,
        },
      });

      if (response.data.data && response.data.data.content) {
        const mappedProducts = mapMockImages(response.data.data.content); // 🔹 이미지 매핑
        setProducts(mappedProducts); // 부모 컴포넌트로 데이터 전달
        console.log("Filtered Products with Images:", mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 🔹 카테고리 변경 시 실행
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    fetchProducts({ category });
    setSearchParams({ category });
  };

  // 🔹 정렬 변경 시 실행
  const handleSortChange = async (sortOption, apiSortValue) => {
    setSelectedSort(sortOption);
    setDropdownOpen(false);
    fetchProducts({ sort: apiSortValue });
    setSearchParams({
      sort: apiSortValue,
    });
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
        {categories?.map((category, index) => (
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
