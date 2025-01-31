import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mockData from "../data/mockData";

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

const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product detail from mockData
    const productDetail = mockData.find(
      (item) => item.product_id === parseInt(product_id, 10)
    );
    setProduct(productDetail);

    // Server communication code (commented out)
    // const fetchProduct = async () => {
    //   try {
    //     const response = await axios.get(`/product/${product_id}`);
    //     setProduct(response.data);
    //   } catch (error) {
    //     console.error("Failed to fetch product:", error);
    //   }
    // };
    // fetchProduct();
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContainer>
      <ProductImage src={product.image} alt={product.product_name} />
      <ProductTitle>{product.product_name}</ProductTitle>
      <ProductPrice>{product.price}</ProductPrice>
    </ProductContainer>
  );
};

export default ProductDetail;
