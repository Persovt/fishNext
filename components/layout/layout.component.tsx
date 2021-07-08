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
  Select,
  Button,
} from "antd";
import React, { ReactDOM } from "react";

const { Header, Content, Sider, Footer } = Layout;

type LayOutProps = {
  header: ReactDOM;
  footer: ReactDOM;
};
const LayOut = ({ header, footer, children }: any) => {
  return (
    <Layout>
      <Header className="header">{header}</Header>
      <Layout className="layout" style={{ marginTop: "50px" }}>
        {children}
      </Layout>
      <Footer style={{ textAlign: "center" }}>{footer}</Footer>
    </Layout>
  );
};

export default LayOut;
