import React, { useState } from "react";
import styled from "styled-components";
import { FaAppleAlt } from "react-icons/fa";

const Container = styled.div`
  background-color: #6bae45;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CategoryBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;
  cursor: pointer;
  color: white;

  &:hover {
    font-weight: bold;
  }
`;
const Dropdown = styled.div`
  position: relative;
  display: inline-block;
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
  min-width: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export default function CategoryMenu() {
  const [selectedSort, setSelectedSort] = useState("정렬");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    setDropdownOpen(false); // Close dropdown after selecting
  };

  const categories = ["과일", "채소", "곡물", "견과류", "향신료"];

  const sortOptions = ["최신순", "인기순", "남은시간"];
  return (
    <Container>
      <CategoryBar>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            <span>{category}</span>
          </CategoryItem>
        ))}
      </CategoryBar>

      <Dropdown>
        <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedSort} ▾
        </DropdownButton>
        <DropdownContent show={dropdownOpen}>
          {sortOptions.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSortChange(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </Container>
  );
}
