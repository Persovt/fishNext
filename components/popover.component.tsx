import { Popover, Button } from "antd";
import { List, Avatar } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton, Space, Divider, Switch, Form, Radio } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cartOrderList, deleteCartOrder } from "../redux/slices/orderSlice";
import ChangeOrderModal from "../components/changeOrder/changeOrder.module";
import AddOrderDataModel from "../components/addOrderData/AddOrderData.module";
import AuthHook from "../hooks/auth.hook";
import PopoverContent from "./popoverContent.component";
type PopOver = {
  children: React.Component;
  cartProducts: Array<Object>;
};
const PopOver = ({
  children,
  cartProducts,
}: //authData,
any) => {
  const { authData } = AuthHook();
  return (
    <>
      <Popover
        overlayStyle={{ width: "600px" }}
        placement="bottomRight"
        title={<span style={{ margin: "0 auto" }}>Корзина</span>}
        content={
          <PopoverContent cartProducts={cartProducts} authData={authData} />
        }
        trigger="click"
      >
        {children}
      </Popover>
    </>
  );
};
export default PopOver;
