import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import mockData from "../../data/mockData";

export default function InfoDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://15.164.139.247:8080/product/${productId}`
        );
        const fetchedProduct = response.data.data;

        const mockDataMap = mockData.reduce((acc, item) => {
          acc[item.productId] = item.image; // productId를 키로 매핑
          return acc;
        }, {});

        setProduct({
          ...fetchedProduct,
          image: mockDataMap[fetchedProduct.productId] || "/images/garlic.jpg",
        });
      } catch (err) {
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleBuy = () => {
    console.log("test");
  };
  return (
    <>
      <InfoContainer>
        <ImageSection>
          <MainImage src={product.image} alt={product.productName} />
        </ImageSection>
        <InfoSection>
          <ProductTitle>{product.productName}</ProductTitle>
          <ProductPrice>{product.price}</ProductPrice>
          <PurchaseBtn onClick={handleBuy}>바로 구매</PurchaseBtn>
        </InfoSection>
      </InfoContainer>
    </>
  );
}

//style
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ImageSection = styled.div``;

const MainImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  width: 400px;
  height: 400px;
`;

const ProductTitle = styled.h2`
  margin: 20px 0;
  font-size: 24px;
  color: #333;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #54451a;
  font-weight: bold;
`;

const PurchaseBtn = styled.button`
  width: 150px;
  height: 45px;
  background: var(--main);
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
`;
