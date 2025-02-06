import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail ";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Redirect from "./pages/Redirect.jsx";
import Main from "./pages/Main.jsx";
import TotalParties from "./pages/TotalParties.jsx";
import MyPage from "./pages/MyPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/product/:productId/party" element={<TotalParties />} />

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
