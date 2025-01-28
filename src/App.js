import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/main/ProductList";
import ProductDetail from "./pages/ProductDetail ";
import Header from "./components/common/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:product_id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
