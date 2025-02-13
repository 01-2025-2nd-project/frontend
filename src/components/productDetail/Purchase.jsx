import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Purchase({ productId, productPrice }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const totalPrice = productPrice * quantity;

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
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const orderData = {
      quantity: Number(quantity),
    };

    try {
      await axios.post(
        `http://15.164.139.247:8080/order/${productId}`,
        orderData,
        { headers }
      );

      alert("주문이 완료되었습니다");
    } catch (error) {
      console.error("주문 실패:", error);
      alert("주문에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <QuantitySection>
        <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
        <QuantityDisplay>{quantity}</QuantityDisplay>
        <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
      </QuantitySection>
      <ProductPrice>{formatPrice(totalPrice)}원</ProductPrice>
      <PurchaseBtn onClick={handleBuy}>바로 구매</PurchaseBtn>
    </>
  );
}

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 15px;
`;

const QuantityDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 40px;
  text-align: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #54451a;
  font-weight: bold;
  margin-bottom: 15px;
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

  @media (max-width: 768px) {
    width: 40%;
    margin: 20px auto;
  }
`;
