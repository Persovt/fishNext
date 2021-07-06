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
import { useEffect, useState } from "react";
import InputCode from "../inputCode/inputCode.component";
import InputPhone from "../inputPhone/inputPhone.component";
import InputEmail from "../inputEmail/inputEmail.component";
import AuthCodeModal from "../inputCodeModal/authCodeModal.component";
import axios from "axios";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
type Auth = {
  setAuthStatus: Function;
  setIsModalAuthVisible: Function;
  visible: boolean;
};
const Auth = ({ setAuthStatus, setIsModalAuthVisible, visible }: Auth) => {
  const [disabelForm, setDisabelForm] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = useState<string>("Авторизация");
  const [authType, setAuthType] = useState<string>("mail");
  const [inputAdresCode, setInputAdresCode] = useState<Object>({
    type: "email",
    email: "",
  });
  const [authCode, setAuthCode] = useState<string>("");
  const [authPhoneStatus, setAuthPhoneStatus] = useState<boolean>(true);
  const [isModalAuthCodeVisible, setIsModalAuthCodeVisible] =
    useState<boolean>(false);

  const handleOk = () => {
    setIsModalAuthVisible(false);
  };

  const handleCancel = () => {
    setIsModalAuthVisible(false);
  };
  const sendCode = (value: Object) => {
    console.log(inputAdresCode);
    axios("http://localhost:3000/api/auth/sendcode", {
      method: "POST",
      data: inputAdresCode,
    }).then(({ data }) => {
      console.log(data);
      // setAuthPhoneStatus(!data.status);
    });
  };
  const changeAuthStatus = (status: string) => {
    setAuthType(status);
    setDisabelForm(true);
  };
  useEffect(() => {
    axios("http://localhost:3000/api/smsaero/checkStatus").then(({ data }) => {
      console.log(data);
      // setAuthPhoneStatus(!data.status);
    });
  }, []);
  return (
    <>
      <AuthCodeModal
        isModalAuthCodeVisible={isModalAuthCodeVisible}
        setIsModalAuthCodeVisible={setIsModalAuthCodeVisible}
        authCode={authCode}
        setAuthStatus={setAuthStatus}
      />
      <Modal
        style={{
          maxWidth: "fit-content",
          margin: "auto",
        }}
        title={modalTitle}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Menu
          onClick={(value) => changeAuthStatus(value.key)}
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
                    setInputAdresCode({ type: "phone", phone: value });
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
                    setInputAdresCode({ type: "email", email: value });
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
        </Form>
      </Modal>
    </>
  );
};
export default Auth;
