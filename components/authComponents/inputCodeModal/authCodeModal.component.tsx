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
import InputCode from "../inputCode/inputCode.component";
import InputPhone from "../inputPhone/inputPhone.component";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
type Auth = {
  setAuthStatus: Function;
  data: {
    type: string;
    value: string;
  };
  closeModal: Function;
  setAuthData: Function;
};
const AuthCode = ({ setAuthStatus, data, closeModal, setAuthData }: Auth) => {
  const [disabelForm, setDisabelForm] = useState<boolean>(true);
  const [inputAuthCode, setInputAuthCode] = useState<string>("");
  const fpPromise = FingerprintJS.load();
  const checkCode = async () => {
    const fp = await fpPromise;
    const result = await fp.get();

    setInputAuthCode("");
    closeModal();
    axios("http://localhost:3000/api/auth/auth", {
      method: "POST",
      data: {
        [data.type]: data.value,
        code: inputAuthCode,
        visitorId: result.visitorId,
      },
    }).then(({ data }: any) => {
      setAuthStatus(data.succes);
      setAuthData(data.data);
    });
  };
  return (
    <>
      <Form
        // {...layout}
        name="nest-messages"
        onFinish={() => checkCode()}
      >
        <Form.Item name={"phone"} required>
          <InputCode
            value={inputAuthCode}
            onChange={(value: string) => {
              if (value.length > 3) {
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
    </>
  );
};
export default AuthCode;
