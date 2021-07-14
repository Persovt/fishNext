import { createSlice } from "@reduxjs/toolkit";
type initialStateType = {
  authData: Object;
  status: boolean;
};
const initialState: initialStateType = {
  status: false,
  authData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state: initialStateType, action) => {
      state.authData = action.payload.authData;
    },
    setAuthStatus: (state: initialStateType, action) => {
        console.log(action.payload, 'action.payload.status')
      state.status = action.payload.status;
    },
  },
});

export const { setAuthData,setAuthStatus } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const authStatus = (state: any) => state.auth.status;
export const authData = (state: any) => state.auth.authData;

export default authSlice.reducer;
