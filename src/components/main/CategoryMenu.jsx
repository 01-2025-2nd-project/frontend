import React, { useState } from "react";
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

export default function CategoryMenu({ setSort }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");

  const handleSortChange = async (sortOption, apiSortValue) => {
    setSelectedSort(sortOption);
    setDropdownOpen(false);
    setSort(apiSortValue);

    try {
      const response = await axios.get("api/product", {
        params: { sort: apiSortValue },
      });
      console.log("Sorted Data:", response.data);
    } catch (error) {
      console.error("Error fetching sorted products:", error);
    }
  };

  const categories = ["과일", "채소", "곡물", "견과류", "향신료"];
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
          <CategoryItem key={index}>{category}</CategoryItem>
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
