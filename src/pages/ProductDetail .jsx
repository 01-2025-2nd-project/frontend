import { useState } from "react";
import Header from "../components/common/Header";
import InfoDetail from "../components/productDetail/InfoDetail";
import Parties from "../components/productDetail/Parties";

export default function ProductDetail() {
  const [options, setOptions] = useState([]);
  return (
    <>
      <Header />
      <InfoDetail setOptions={setOptions} />
      {options.length > 0 && <Parties />}
    </>
  );
}
