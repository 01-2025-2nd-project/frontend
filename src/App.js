import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail ";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Redirect from "./pages/Redirect.jsx";
import Main from "./pages/Main.jsx";
import TotalParties from "./pages/TotalParties.jsx";
import MyPage from "./pages/MyPage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Order from "./pages/Order.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:productId/party" element={<TotalParties />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/kakao-login" element={<Redirect />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
