import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Mock Data
const mockData = Array.from({ length: 20 }, (v, i) => ({
  product_id: i + 1,
  name: `Item ${i + 1}`,
  price: `₩${(i + 1) * 1000}`,
  image: `https://picsum.photos/200?random=${i + 1}`,
  description: `This is the description for Item ${i + 1}.`,
}));

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ProductImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const ProductTitle = styled.h2`
  margin: 20px 0;
  font-size: 24px;
  color: #333;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #6a1b9a;
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
    <Container>
      <ProductImage
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
      />
      <ProductTitle>{product.name}</ProductTitle>
      <ProductPrice>가격: {product.price}</ProductPrice>
      <p>{product.description}</p>
    </Container>
  );
};

export default ProductDetail;
