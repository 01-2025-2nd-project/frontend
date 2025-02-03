import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail ";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import Main from "./pages/Main.jsx";
import TotalParties from "./pages/TotalParties.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/my" element={<MyPage />}></Route>
        <Route path="/product/:productId/party" element={<TotalParties />} />
      </Routes>
    </Router>
  );
}

export default App;
