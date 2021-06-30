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
import { useState } from "react";
import InputCode from "./inputCode.component";
import InputPhone from "./inputPhone.component";
import AuthCodeModal from "./authCodeModal.component";
import axios from "axios";
type Auth = {
  setAuthStatus: Function;
  setIsModalAuthVisible: Function;
  visible: boolean;
};
const Auth = ({ setAuthStatus, setIsModalAuthVisible, visible }: Auth) => {
  const [disabelForm, setDisabelForm] = useState<boolean>(true);
  const [inputPhone, setInputPhone] = useState<string>("");
  const [authCode, setAuthCode] = useState<string>("");
  const [isModalAuthCodeVisible, setIsModalAuthCodeVisible] =
    useState<boolean>(false);

  const handleOk = () => {
    setIsModalAuthVisible(false);
  };

  const handleCancel = () => {
    setIsModalAuthVisible(false);
  };
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
        title="Авторизация"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          // {...layout}
          name="nest-messages"
          onFinish={(e) => {
            const randomCode = Math.trunc(Math.random() * 1000000);
            setAuthCode(randomCode.toString());
            console.log(inputPhone, randomCode);
            //ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!ВЕРУНУТЬ!!!!
            // axios(
            //   `/api/smsaero?randomCode=${randomCode}&inputPhone=${inputPhone}`
            // ).then((data) => console.log(data));
            setIsModalAuthCodeVisible(true);
            setIsModalAuthVisible(false);
          }}
        >
          <Form.Item name={"phone"} required>
            <InputPhone
              onChange={(value: string) => {
                if (value.length > 9) {
                  setInputPhone(value);
                  setDisabelForm(false);
                } else setDisabelForm(true);
              }}
            />
          </Form.Item>
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
