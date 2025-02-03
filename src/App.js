import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/main/ProductList";
import ProductDetail from "./pages/ProductDetail ";
import Header from "./components/common/Header";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import Redirect from "./pages/Redirect.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:product_id" element={<ProductDetail />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/kakao-login" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
