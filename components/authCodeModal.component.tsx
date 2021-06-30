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
type Auth = {
  setIsModalAuthCodeVisible: Function;
  isModalAuthCodeVisible: boolean;
  setAuthStatus: Function;
  authCode: string;
};
const AuthCode = ({
  setIsModalAuthCodeVisible,
  isModalAuthCodeVisible,
  setAuthStatus,
  authCode,
}: Auth) => {
  const [disabelForm, setDisabelForm] = useState<boolean>(true);
  const [inputAuthCode, setInputAuthCode] = useState<string>("");
  const handleOk = () => {
    setIsModalAuthCodeVisible(false);
  };

  const handleCancel = () => {
    setIsModalAuthCodeVisible(false);
  };
  return (
    <>
      <Modal
        style={{
          maxWidth: "fit-content",
          margin: "auto",
        }}
        title="Авторизация"
        visible={isModalAuthCodeVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          // {...layout}
          name="nest-messages"
          onFinish={(e) => {
         /*

         AAAAAAAAA вернуть!!!!!!!!!!

         */
            // if (authCode === inputAuthCode) {
              setAuthStatus(true);
              setIsModalAuthCodeVisible(false);
            // }
          }}
        >
          <Form.Item name={"phone"} required>
            <InputCode
              onChange={(value: string) => {
                if (value.length > 5) {
                  setInputAuthCode(value);
                  setDisabelForm(false);
                } else setDisabelForm(true);
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit" disabled={disabelForm}>
              Авторизоваться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AuthCode;
