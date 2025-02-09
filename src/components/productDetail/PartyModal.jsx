import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  width: 80%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DiscountedPrice = styled.p`
  font-weight: bold;
  color: green;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CloseButton = styled.button`
  padding: 10px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: var(--main);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function PartyModal({ isOpen, onClose, productId }) {
  const [formData, setFormData] = useState({
    partyName: "",
    optionId: "",
    productName: "",
    endDate: "",
    purchaseCount: "",
  });

  const [productOptions, setProductOptions] = useState([]);
  const [productPrice, setProductPrice] = useState(0); // 원래 상품 가격 저장
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모달이 열릴 때만 상품 정보 가져오기
  useEffect(() => {
    if (!isOpen) return;

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        const data = response.data.data;
        setProductOptions(data.productOptions);
        setProductPrice(data.price); // 원래 상품 가격 저장

        setFormData((prev) => ({
          ...prev,
          productName: data.productName,
        }));
      } catch (error) {
        console.error("상품 정보 로드 실패:", error);
      }
    };

    fetchProductDetails();
  }, [isOpen, productId]);

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "endDate") {
      const formattedDate = formatDateToYYYYMMDD(value);
      console.log(formattedDate);
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOptionChange = (e) => {
    const selectedOptionId = Number(e.target.value);
    setFormData({ ...formData, optionId: selectedOptionId });
  };

  const selectedOption = productOptions.find(
    (opt) => opt.optionId === Number(formData.optionId)
  );

  // 할인된 가격 계산
  const discountedPrice = selectedOption
    ? productPrice - productPrice * selectedOption.optionPrice
    : productPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 백엔드 요구사항에 맞게 데이터 변환
    const formattedData = {
      ...formData,
      optionId: Number(formData.optionId), // 숫자로 변환
      purchaseCount: Number(formData.purchaseCount), // 숫자로 변환
    };
    console.log(formattedData);

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post("/api/party", formattedData, {
        headers,
      });
      alert("파티가 성공적으로 생성되었습니다.");
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("파티 생성 실패:", error);
      alert("파티 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // 모달이 닫혀있으면 렌더 X

  return (
    <ModalOverlay>
      <ModalContent>
        <h4>파티 만들기</h4>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>파티 이름</Label>
            <Input
              type="text"
              name="partyName"
              value={formData.partyName}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>상품명</Label>
            <Input type="text" value={formData.productName} disabled />
          </InputGroup>
          <Label>개수</Label>
          <InputGroup>
            <Input
              type="number"
              name="purchaseCount"
              value={formData.purchaseCount}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>옵션 선택</Label>
            <Select name="optionId" onChange={handleOptionChange} required>
              <option value="">옵션을 선택하세요</option>
              {productOptions.map((option) => (
                <option key={option.optionId} value={option.optionId}>
                  {option.option}명 - {option.optionPrice * 100}% 할인
                </option>
              ))}
            </Select>
          </InputGroup>

          {selectedOption && (
            <>
              <DiscountedPrice>
                💰 할인된 가격: {discountedPrice.toLocaleString()}원
              </DiscountedPrice>
            </>
          )}

          <InputGroup>
            <Label>종료 날짜</Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <ModalActions>
            <CloseButton onClick={onClose}>닫기</CloseButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "생성 중..." : "생성"}
            </SubmitButton>
          </ModalActions>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
