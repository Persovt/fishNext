import { Popover, Button } from "antd";
import { List, Avatar } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton, Space, Divider, Switch, Form, Radio } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cartOrderList, deleteCartOrder } from "../redux/slices/orderSlice";
import ChangeOrder from "../components/changeOrder/changeOrder.module";
const text = <span style={{ margin: "0 auto" }}>Корзина</span>;
const Content = ({ authData }: any) => {
  const cartProducts = useSelector(cartOrderList);
  const dispatch = useDispatch();
  console.log(cartProducts, "cartProducts");
  const createOrder = (cartProducts: Array<Object>, authData: Object) => {
    console.log(cartProducts, authData, "HEELLLOO!!!");

    axios("http://localhost:3000/api/moysklad/createOrder", {
      method: "POST",
      data: {
        cartProducts: cartProducts,
        authData,
      },
    }).then(({ data }) => console.log(data, "authauthauth"));
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={cartProducts}
        renderItem={(item: any, index: number) => (
          <List.Item>
            <div className="cartList__image">
              {item.images.length ? (
                <img
                  src={item.images[0]}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Skeleton.Avatar className="cartList__skeletonAvatar" />
              )}
            </div>
            <div className="cartList__information">
              <span className="cartList__name">{item.name}</span>
            </div>
            <div className="cartList__right" style={{ display: "flex" }}>
              <div className="cartList__price">
                {item.price}₽ <span>x{item.quantity}</span>{" "}
              </div>
              <div className="cartList__action">
                <div className="cartList__action-item">
                  <DeleteOutlined
                    onClick={() => {
                      dispatch(deleteCartOrder({id: item.id}));
                      //onDeleteCartProduct(index)
                    }}
                  />
                </div>
              </div>
            </div>

            {/* <List.Item.Meta
          avatar={
            item.images.length ? (
              <Avatar src={item.images[0]} />
            ) : (
              <Skeleton.Avatar />
            )
          }
          title={<span>{item.name}</span>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        /> */}
          </List.Item>
        )}
      />
      <hr />
      <div className="popOver__footer">
        <div className="popOver__orderPrice">
          Итого:{" "}
          {cartProducts.reduce(
            (acc: number, item: { price: number }) => acc + item.price,
            0
          )}
        </div>
        <Button
          disabled={!cartProducts.length}
          onClick={() => createOrder(cartProducts, authData)}
        >
          Купить
        </Button>
      </div>
    </>
  );
};

type PopOver = {
  children: React.Component;
  cartProducts: Array<Object>;
  onDeleteCartProduct: Function;
  authData: Object;
};
const PopOver = ({
  children,
  cartProducts,
  onDeleteCartProduct,
  authData,
}: any) => {
  return (
    <>
      <Popover
        overlayStyle={{ width: "600px" }}
        placement="bottomRight"
        title={text}
        content={
          <Content
            cartProducts={cartProducts}
            onDeleteCartProduct={onDeleteCartProduct}
            authData={authData}
          />
        }
        trigger="click"
      >
        {children}
      </Popover>
    </>
  );
};
export default PopOver;
