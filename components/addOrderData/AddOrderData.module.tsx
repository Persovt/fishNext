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
type addOrderDataType = {
  visible: boolean;
  setVisible: Function;
};
const addOrderData = ({ visible, setVisible }: addOrderDataType) => {
  function closeModal(setVisible: Function) {
    setVisible(false);
  }
  return (
    <>
      <Modal
        style={{
          maxWidth: "fit-content",
          margin: "auto",
        }}
        visible={visible}
        onOk={() => closeModal(setVisible)}
        onCancel={() => closeModal(setVisible)}
        footer={null}
      ></Modal>
    </>
  );
};
export default addOrderData;
