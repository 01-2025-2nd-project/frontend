import { Route, BrowserRouter, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
