import {
  Layout,
  Menu,
  Breadcrumb,
  Slider,
  Checkbox,
  Input,
  Badge,
  Modal,
  Radio,
  Form,
  Button,
} from "antd";
import NumberFormat from "react-number-format";
import { DOMElement, useEffect, useState } from "react";
import InputCode from "../inputCode/inputCode.component";
import InputPhone from "../inputPhone/inputPhone.component";
import InputEmail from "../inputEmail/inputEmail.component";
import AuthCodeComponent from "../inputCodeModal/authCodeModal.component"; //"../inputCodeModal/authCodeModal.component";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
type Auth = {
  // setAuthStatus: Function;
  setIsModalAuthVisible: Function;
  visible: boolean;
  // setAuthData: Function;
};
const Auth = ({
  // setAuthStatus,
  setIsModalAuthVisible,
  visible,
  // setAuthData,
}: Auth) => {
  const [disabelForm, setDisabelForm] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = useState<string | any>("Авторизация");
  const [authType, setAuthType] = useState<string>("mail");
  const [visibleInputCode, setVisibleInputCode] = useState<boolean>(false);
  const [inputAdresCode, setInputAdresCode] = useState<{
    value: string;
    type: string;
  }>({
    type: "email",
    value: "",
  });
  const [authCode, setAuthCode] = useState<string>("");
  const [authPhoneStatus, setAuthPhoneStatus] = useState<boolean>(true);
  const [isModalAuthCodeVisible, setIsModalAuthCodeVisible] =
    useState<boolean>(false);
  const fpPromise = FingerprintJS.load();
  const defaultAuthModal = () => {
    setAuthType("mail");
    setInputAdresCode({
      type: "email",
      value: "",
    });
    setVisibleInputCode(false);
    setModalTitle("Авторизация");
  };
  const closeModal = () => {
    setIsModalAuthVisible(false);
    defaultAuthModal();
  };

  const sendCode = async (value: Object) => {
    const fp = await fpPromise;
    const result = await fp.get();

    console.log(inputAdresCode);
    axios("http://localhost:3000/api/auth/sendcode", {
      method: "POST",
      data: {
        [inputAdresCode.type]: inputAdresCode.value,
        type: inputAdresCode.type,
        visitorId: result.visitorId
      },
    }).then(({ data }) => console.log(data, "sendCode"));

    axios("http://localhost:3000/api/auth/auth", {
      method: "POST",
      data: {
        [inputAdresCode.type]: inputAdresCode.value,
        code: authCode,
      },
    }).then(({ data }) => console.log(data, "authauthauth"));

    setModalTitle(
      <>
        <Button className="back-arrow" onClick={() => defaultAuthModal()}>
          ←
        </Button>{" "}
        Введите код
      </>
    );
    setVisibleInputCode(true);
  };
  const changeAuthStatus = (status: string) => {
    setAuthType(status);
    setDisabelForm(true);
  };
  useEffect(() => {
    axios("http://localhost:3000/api/smsaero/checkStatus").then(({ data }) => {
      setAuthPhoneStatus(!data.status);
    });
  }, []);
  return (
    <>
      {/* <AuthCodeModal
        isModalAuthCodeVisible={isModalAuthCodeVisible}
        setIsModalAuthCodeVisible={setIsModalAuthCodeVisible}
        authCode={authCode}
        setAuthStatus={setAuthStatus} ←←
      /> */}
      <Modal
        style={{
          maxWidth: "fit-content",
          margin: "auto",
        }}
        title={modalTitle}
        visible={visible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        {!visibleInputCode ? (
          <>
            {" "}
            <Menu
              onClick={({ key }: any) => changeAuthStatus(key)}
              mode="horizontal"
              defaultSelectedKeys={["mail"]}
              className="auth__menu-change-type"
            >
              <Menu.Item key="mail" icon={<MailOutlined />}>
                Почта
              </Menu.Item>
              <Menu.Item
                key="phone"
                icon={<PhoneOutlined />}
                disabled={authPhoneStatus}
              >
                Телефон
              </Menu.Item>
            </Menu>
            <Form
              // {...layout}
              name="nest-messages"
              onFinish={(e) => sendCode(e)}
            >
              {authType === "phone" ? (
                <Form.Item name={"value"} required>
                  <InputPhone
                    onChange={(value: string) => {
                      if (value.length > 9) {
                        setInputAdresCode({ type: "phone", value: value });
                        setDisabelForm(false);
                      } else setDisabelForm(true);
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name={"value"} required>
                  <InputEmail
                    onChange={(value: string) => {
                      if (/.+@.+\.[A-Za-z]+$/.test(value)) {
                        setInputAdresCode({ type: "email", value: value });
                        setDisabelForm(false);
                      } else setDisabelForm(true);
                    }}
                  />
                </Form.Item>
              )}

              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" htmlType="submit" disabled={disabelForm}>
                  Отправить код
                </Button>
              </Form.Item>
            </Form>{" "}
          </>
        ) : (
          <AuthCodeComponent
            closeModal={closeModal}
            // setAuthStatus={setAuthStatus}
            // setAuthData={setAuthData}
            data={inputAdresCode}
          />
        )}
      </Modal>
    </>
  );
};
export default Auth;
