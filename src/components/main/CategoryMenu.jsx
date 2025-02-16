import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import mockData from "../../data/mockData";
import { useSearchParams } from "react-router-dom";

export default function CategoryMenu({
  setProducts,
  setSearchParams,
  setTotalItems,
}) {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
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

  const mapMockImages = (products) => {
    const mockDataMap = mockData.reduce((acc, item) => {
      acc[item.productId] = item.image;
      return acc;
    }, {});

    return products.map((item) => ({
      ...item,
      image: mockDataMap[item.productId] || "/images/default.jpg",
    }));
  };

  const fetchProducts = async ({ sort, category, page }) => {
    try {
      const response = await axios.get("http://15.164.139.247:8080/product", {
        params: {
          sort: sort || selectedSort,
          category: category || selectedCategory,
          page: page || 0,
        },
      });

      if (response.data.data && response.data.data.content) {
        const mappedProducts = mapMockImages(response.data.data.content);
        setProducts(mappedProducts);
        setTotalItems(response.data.data.totalElements);
        setTotalPages(response.data.data.totalPages);
        console.log("Filtered Products with Images:", mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", category);
    newParams.set("page", 1); // ✅ React는 1부터 시작
    setSearchParams(newParams);
  };

  const handleSortChange = (sortOption, apiSortValue) => {
    setDropdownOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", apiSortValue);
    newParams.set("page", 1); // ✅ React는 1부터 시작
    setSearchParams(newParams);
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
