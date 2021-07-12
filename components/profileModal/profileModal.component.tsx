import {
  Modal,
  Button,
  Rate,
  Radio,
  Input,
  List,
  Avatar,
  RadioChangeEvent,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Collapse } from "antd";
import style from "./profileModal.module.css";
const { Panel } = Collapse;

interface profileModal {
  visible: boolean;
  setIsModalProfileVisible: Function;
  authData: any;
}
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const profileModal = ({
  setIsModalProfileVisible,
  visible,
  authData,
}: profileModal) => {
  const [orderList, setOrderList] = useState([]);
  const handleOk = () => {
    setIsModalProfileVisible(false);
  };

  const handleCancel = () => {
    setIsModalProfileVisible(false);
  };
  const setRate = (value: number, id: number): void => {
    console.log(value, id);
  };
  useEffect(() => {
    console.log(authData);
    if (authData.id) {
      axios("http://localhost:3000/api/moysklad/getOrders", {
        method: "POST",
        data: {
          authData,
        },
      }).then(({ data }: any) => {
        console.log(data, "getOrders");
        setOrderList(data.data);
      });
    }
  }, [authData.id]);
  return (
    <Modal
      className={style.profileModal}
      title="Профиль"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={style.profile}>
        <div className={style.profile__leftSide}>
          <div className={style.profile__itemInfo}>
            ФИО: <p className={style.profile__userInfo}>{authData.name}</p>
          </div>
          {/* <div className="profile__itemInfo profile__secondName">
            Фамилия:
            <p className="profile__userInfo">Митин</p>
          </div> */}
          <div className={style.profile__itemInfo}>
            Номер телефона:
            <p className={style.profile__userInfo}>{authData.phone || "нет"}</p>
          </div>
          <div className={style.profile__itemInfo}>
            Почта:
            <p className={style.profile__userInfo}>{authData.email || "нет"}</p>
          </div>
          <div className={style.profile__itemInfo}>
            Адрес:
            <p className={style.profile__userInfo}>
              {authData.actualAddress || "нет"}
            </p>
          </div>
        </div>
        <div className={style.profile__rightSide}>
          <Collapse defaultActiveKey={["1"]}>
            {orderList.map((item: any, index: number) => {
              const header = <div className="">I header :3</div>;
              return (
                <Panel header={header} key={index}>
                  <p>123</p>
                </Panel>
              );
            })}
          </Collapse>
        </div>
      </div>
    </Modal>
  );
};
export default profileModal;
