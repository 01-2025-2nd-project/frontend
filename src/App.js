

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/main/ProductList";
import ProductDetail from "./pages/ProductDetail ";
import Header from "./components/common/Header";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:product_id" element={<ProductDetail />} />
                  <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
   <Route path="/my" element={<MyPage />}></Route>
      </Routes>
    </Router>


  );
}

export default App;
