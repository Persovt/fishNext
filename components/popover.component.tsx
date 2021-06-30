import { Popover, Button } from "antd";
import { List, Avatar } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton, Space, Divider, Switch, Form, Radio } from "antd";
import axios from "axios";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const text = <span style={{ margin: "0 auto" }}>Корзина</span>;
const Content = ({ cartProdcuts, onDeleteCartProduct }: any) => {
  console.log(cartProdcuts, "cartProdcuts");
//   {
//     lastName: 'Hello!',
//     items: [
//         {
//             productName: '123'
//         }
//     ]
// }
  const createOrder = (cartProdcuts: Array<Object>) => {
    console.log(cartProdcuts)
    axios("/api/retailcrm", {
      method: "POST",
      data: {
        methodFetch: "POST",
        method: "orders/create",
        body: {
          lastName: 'Hello!',
          items: [{
            productName: 'TESTS'
          }]
          // "order[items][]": {
          //   productName: 'BIGBIIBIBIB'
          // },
        },
      },
    }).then((res) => console.log(res));
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={cartProdcuts}
        renderItem={(item: any, index: number) => (
          <List.Item>
            <div className="cartList__image">
              {item.images.length ? (
                <img
                  src={item.images[0]}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Skeleton.Avatar />
              )}
            </div>
            <div className="cartList__information">
              <span className="cartList__name">{item.name}</span>
            </div>
            <div className="cartList__right" style={{ display: "flex" }}>
              <div className="cartList__price">{item.price}₽</div>
              <div className="cartList__action">
                <div className="cartList__action-item">
                  <DeleteOutlined onClick={() => onDeleteCartProduct(index)} />
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
        <Button
          disabled={!cartProdcuts.length}
          onClick={() => createOrder(cartProdcuts)}
        >
          Купить
        </Button>
      </div>
    </>
  );
};
const buttonWidth = 70;
type PopOver = {
  children: React.Component;
  cartProdcuts: Array<Object>;
  onDeleteCartProduct: Function;
};
const PopOver = ({ children, cartProdcuts, onDeleteCartProduct }: any) => {
  return (
    <>
      <Popover
        overlayStyle={{ width: "600px" }}
        placement="bottomRight"
        title={text}
        content={
          <Content
            cartProdcuts={cartProdcuts}
            onDeleteCartProduct={onDeleteCartProduct}
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
