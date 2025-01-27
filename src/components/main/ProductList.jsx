import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Item = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

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
  color: #6a1b9a;
  font-weight: bold;
`;

const mockData = Array.from({ length: 20 }, (v, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  price: `₩${(i + 1) * 1000}`,
  image: `https://picsum.photos/200?random=${i + 1}`,
}));

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Simulate fetching data with mock data
    const paginatedData = mockData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    setItems(paginatedData);
  }, [page]);

  return (
    <>
      <ItemGrid>
        {items.map((item) => (
          <Item key={item.id}>
            <img
              src={item.image || "https://via.placeholder.com/200"}
              alt={item.title}
            />
            <ItemTitle>상품 : {item.title}</ItemTitle>
            <ItemPrice>가격 : {item.price}</ItemPrice>
          </Item>
        ))}
      </ItemGrid>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          &lt;&lt;
        </button>
        <span style={{ margin: "0 10px" }}>{page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}> &gt;&gt;</button>
      </div>
    </>
  );
}
