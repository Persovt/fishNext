import { createSlice } from "@reduxjs/toolkit";
type initialStateType = {
  orderList: Array<Object>;
};
const initialState: initialStateType = {
  orderList: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartOrderQuantity: (state: initialStateType, action) => {
      let findItem: any = state.orderList.find(
        (item: any) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.quantity = action.payload.value;
        state = state;
      }
    },
    addCartOrder: (state: initialStateType, action) => {
      console.log(action.payload);
      let newObject = Object.assign({}, action.payload);
      newObject.quantity = 1;
      state.orderList = [...state.orderList, newObject];
    },
    deleteCartOrder: (state: initialStateType, action) => {
      state.orderList = state.orderList.filter(
        (item: any) => item.id != action.payload.id
      );
    },
  },
});

export const { setCartOrderQuantity, addCartOrder, deleteCartOrder } =
  counterSlice.actions;

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
export const cartOrderList = (state: any) => state.cart.orderList;

export default counterSlice.reducer;
