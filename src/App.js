import { Route, BrowserRouter, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/my" element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
