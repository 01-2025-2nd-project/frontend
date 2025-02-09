import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import mockData from "../../data/mockData";

export default function InfoDetail({ setOptions }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://15.164.139.247:8080/product/${productId}`
        );
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

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const totalPrice = product.price * quantity;

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < 99 ? prev + 1 : prev)); // 최대 99개 제한
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer${token}`,
      "Content-Type": "application/json",
    };

    const orderData = {
      price: product.price,
      finalPrice: totalPrice,
      totalCount: quantity,
      purchaseDate: new Date().toISOString(),
    };

    try {
      const response = axios.post(
        `http://15.164.139.247:8080/order/${productId}`,
        orderData,
        { headers }
      );
      console.log(response.data);
      alert("주문이 완료되었습니다");
    } catch (error) {
      console.error("주문 실패:", error);
      alert("주문에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <InfoContainer>
        <ImageSection>
          <MainImage src={product.image} alt={product.productName} />
        </ImageSection>
        <InfoSection>
          <ProductTitle>{product.productName}</ProductTitle>
          <QuantitySection>
            <span>수량:</span>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantitySection>
          <ProductPrice>{formatPrice(totalPrice)}원</ProductPrice>
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

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`;

// 🔹 수량 표시 숫자
const QuantityDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 40px;
  text-align: center;
`;

// 🔹 수량 조절 버튼 스타일
const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
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
