import { Button } from "antd";
import {
  setCartOrderQuantity,
  addCartOrder,
  deleteCartOrder,
} from "../../redux/slices/orderSlice";
import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
type changeOrderType = {
  item: any;
};
interface changeQuantityInterface {
  value: number;
  id: string;
}
function changeQuantity(
  { value, id }: changeQuantityInterface,
  dispatch: Function
) {
  if (value > 0) dispatch(setCartOrderQuantity({ id: id, value: value }));
  else dispatch(deleteCartOrder({ id: id }));
}
const changeOrder = ({
  item,
}: // cartProducts,
changeOrderType) => {
  const dispatch = useDispatch();
  const currectOrder = useSelector((state: any) =>
    state.cart.orderList.find((cartProduct: any) => cartProduct.id === item.id)
  );

  console.log(currectOrder, "currectOrder");
  return (
    <>
      {currectOrder ? (
        <div className="modal__variantAction">
          <Button
            className="order__buttonLeft"
            disabled={currectOrder.quantity < 1}
            onClick={() => {
              changeQuantity(
                {
                  id: item.id,
                  value: currectOrder.quantity - 1,
                },
                dispatch
              );
            }}
          >
            -
          </Button>
          <InputNumber
            className="order__inputNumber"
            min={0}
            defaultValue={currectOrder.quantity}
            value={currectOrder.quantity}
            onChange={(value: number) => {
              changeQuantity({ id: item.id, value: value }, dispatch);
              //currectOrder.quantity = value
            }}
            max={item.quantity}
          />
          <Button
            className="order__buttonRight"
            disabled={currectOrder.quantity >= item.quantity}
            onClick={() => {
              changeQuantity(
                {
                  id: item.id,
                  value: currectOrder.quantity + 1,
                },
                dispatch
              );
            }}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          className="order__addCartButton"
          type="primary"
          disabled={!item.quantity}
          onClick={() => {
            dispatch(addCartOrder(item));
          }}
        >
          Добавить
        </Button>
      )}
    </>
  );
};
export default changeOrder;
