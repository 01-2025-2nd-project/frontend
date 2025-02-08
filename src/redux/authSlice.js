import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 설정
const initialState = {
  token: localStorage.getItem("token") || "", // 로컬스토리지에서 토큰 초기화
};

// 슬라이스 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log("새로운 토큰:", action.payload); // 토큰 값 확인
      state.token = action.payload;
      if (action.payload) {
        // 토큰을 로컬스토리지에 저장
        localStorage.setItem("token", action.payload);
        console.log("토큰 로컬스토리지에 저장됨");
      } else {
        // 토큰을 제거
        localStorage.removeItem("token");
        console.log("토큰 로컬스토리지에서 제거됨");
      }
    },
  },
});

// 액션과 리듀서를 export
export const { setToken } = authSlice.actions;
export default authSlice.reducer;
