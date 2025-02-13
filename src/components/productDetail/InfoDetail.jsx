import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import mockData from "../../data/mockData";
import Purchase from "./Purchase";

export default function InfoDetail({ setOptions }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        const fetchedProduct = response.data.data;
        const productOptions = response.data.data.productOptions || [];

        setOptions(productOptions);

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
  }, [productId, setOptions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <InfoContainer>
        <ImageSection>
          <MainImage src={product.image} alt={product.productName} />
        </ImageSection>
        <InfoSection>
          <ProductTitle>{product.productName}</ProductTitle>
          <Purchase
            productId={product.productId}
            productPrice={product.price}
          />
        </InfoSection>
      </InfoContainer>
    </>
  );
}

//style
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const ImageSection = styled.div`
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const ProductTitle = styled.h2`
  margin: 20px 0;
  font-size: 24px;
  margin-bottom: 15px;
`;
