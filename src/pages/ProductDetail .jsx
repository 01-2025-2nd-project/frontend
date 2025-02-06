import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/common/Header";
import Parties from "../components/productDetail/Parties";

const DetailContainer = styled.div`
  margin: 0px 30px;
`;
const ProductContainer = styled.div`
  max-width: 400px;
  margin: 20px 0px 20px 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80%;
  border-radius: 8px;
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

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/apiproduct/${productId}/`);
        setProduct(response.data.data);
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

  return (
    <DetailContainer>
      <Header />
      <ProductContainer>
        <ProductImage src={product.image} alt={product.productName} />
        <ProductTitle>{product.productName}</ProductTitle>
        <ProductPrice>{product.price}</ProductPrice>
      </ProductContainer>
      <Parties />
    </DetailContainer>
  );
}
