import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuthUser from "../../hooks/useAuthUser";

export default function PartyModal({
  isOpen,
  onClose,
  productId,
  onPartyCreated,
  editingParty,
}) {
  const userId = useAuthUser();

  const [productOptions, setProductOptions] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const isEditing = !!editingParty;
  const [formData, setFormData] = useState(
    editingParty || {
      partyName: "",
      optionId: "",
      productName: "",
      endDate: "",
      purchaseCount: 1,
    }
  );

  useEffect(() => {
    if (editingParty) {
      setFormData(editingParty);
    }
  }, [editingParty]);

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

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({ ...prev, partyMaster: userId }));
      console.log("partyMaster 업데이트됨:", userId);
    }
  }, [userId]);

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "purchaseCount") {
      setFormData({ ...formData, purchaseCount: Math.max(1, Number(value)) });
    } else if (name === "endDate") {
      const formattedDate = formatDateToYYYYMMDD(value);
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

  // 총 가격 계산산
  const totalPrice = discountedPrice * formData.purchaseCount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      // partyMaster: userId,
      optionId: Number(formData.optionId),
      purchaseCount: Number(formData.purchaseCount),
    };

    console.log("전송할 데이터:", formattedData); // 🔹 디버깅 로그 추가

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (isEditing) {
        // 수정 요청 (PUT)
        await axios.put(
          `http://15.164.139.247:8080/party/${editingParty.partyId}`,
          formData,
          { headers }
        );
        alert("파티가 수정되었습니다.");
      } else {
        // 생성 요청 (POST)
        await axios.post("http://15.164.139.247:8080/party", formData, {
          headers,
        });
        alert("파티가 생성되었습니다.");
      }
      onPartyCreated();
      setFormData({
        partyMaster: "",
        partyName: "",
        optionId: "",
        productName: "",
        endDate: "",
        purchaseCount: 1,
      });
      onClose(); // 모달 닫기
    } catch (error) {
      if (isEditing) {
        console.error("파티 수정 실패:", error);
        alert("파티 수정에 실패했습니다. 다시 시도해 주세요.");
      } else {
        console.error("파티 생성 실패:", error);
        alert("파티 생성에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  //모달 창 밖 클릭시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    console.log("selectedOption:", selectedOption);
    console.log("productPrice:", productPrice);
    console.log("purchaseCount:", formData.purchaseCount);
    console.log("totalPrice:", totalPrice);
  }, [selectedOption, productPrice, formData.purchaseCount, totalPrice]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h4>{isEditing ? "파티 수정" : "파티 만들기"}</h4>
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
              min="1"
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
              <TotalPrice>
                🏷️ 총 가격: {totalPrice.toLocaleString()}원
              </TotalPrice>
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
            <SubmitButton type="submit">
              {isEditing ? "수정" : "생성"}
            </SubmitButton>
          </ModalActions>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

//style
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

const TotalPrice = styled.p`
  font-weight: bold;
  color: blue;
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
