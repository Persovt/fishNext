import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
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
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import InputCode from "../components/authComponents/inputCode/inputCode.component";
import InputPhone from "../components/authComponents/inputPhone/inputPhone.component";
import ProductModal from "../components/modal.component";
import ShopCard from "../components/shopCard.component";
import styles from "../styles/style.module.css";
import PopOver from "../components/popover.component";
import AuthModal from "../components/authComponents/authCodeModal/authModal.component"
import ProfileModal from "../components/profileModal.component";
import axios from "axios";
const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content, Sider, Footer } = Layout;
//net Shema (
interface Shop {
  productGroup: any;
  products: any;
  maxPrice: number;
}

function Shop({ products, productGroup, maxPrice }: Shop) {


  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalProfileVisible, setIsModalProfileVisible] =
    useState<boolean>(false);
  const [productsList, setProductsList] = useState<any>(products);
  const [filterPrice, setFilterPrice] = useState<[number, number]>([
    0,
    maxPrice,
  ]);
  const [cartProdcuts, setCartProdcuts] = useState<Array<Object>>([]);
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<Object>({});
  const [isModalAuthVisible, setIsModalAuthVisible] = useState<boolean>(false);
  const [selectCategories, setSelectCategories] = useState<Array<string>>([]);
  

  const applyFilter = (filterPrice : [number, number],selectCategories: Array<string>): void => {
    console.log(filterPrice,selectCategories, 'appleFilter')
 axios("http://localhost:3000/api/moysklad/getProducts", {
      method: 'POST',
      data: {
        filter: {
          minPrice: filterPrice[0],
          maxPrice: filterPrice[1],
          categories: selectCategories
        }
      }
    }).then(({data}: any) => setProductsList(data.data.products)) 
  }
  const addProductCart = (product: Object) => {
  
    setCartProdcuts([product, ...cartProdcuts]);
  };
  const onDeleteCartProduct = (index: number) => {
    setCartProdcuts(
      cartProdcuts.filter(
        (item: any, indexProduct: number) => index != indexProduct
      )
    );
  };

  return (
    <div className="">
      <ProfileModal
        visible={isModalProfileVisible}
        setIsModalProfileVisible={setIsModalProfileVisible}
      />
      <ProductModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        currentCard={currentCard}
        addProductCart={addProductCart}
      />

      <AuthModal
        setAuthStatus={setAuthStatus}
        setIsModalAuthVisible={setIsModalAuthVisible}
        visible={isModalAuthVisible}
      />
      <Layout>
        <Header className="header">
          {/* <div className="logo" /> */}
          {authStatus ? (
            <>
              <div
                className="menu__item"
                onClick={() => setIsModalProfileVisible(true)}
              >
                <UserOutlined />
              </div>

              <div className="menu__item">
                <PopOver
                  cartProdcuts={cartProdcuts}
                  onDeleteCartProduct={onDeleteCartProduct}
                >
                  <Badge count={cartProdcuts.length} offset={[10, -10]}>
                    <ShoppingCartOutlined />
                  </Badge>
                </PopOver>
              </div>
              <div className="menu__item" onClick={() => setAuthStatus(false)}>
                <LogoutOutlined />
              </div>
            </>
          ) : (
            <div
              className="menu__item"
              onClick={() => setIsModalAuthVisible(true)}
            >
              <LoginOutlined />
            </div>
          )}
        </Header>
        <Layout className="layout" style={{ marginTop: "50px" }}>
          <Sider width={300} className="site-layout-background">
            <div className="filters">
              <div className="menu__title">Фильтры:</div>

              <div className="price__filter">
                <div className="price__filter-title">Диапозон цены:</div>
                <Slider
                  range
                  defaultValue={filterPrice}
                  value={filterPrice}
                  max={maxPrice}
                  // onAfterChange={(value) => setFilterPrice(value)}
                  onChange={(val) => setFilterPrice(val)}
                />
                <div className="price__filter-input">
                  <Input
                    placeholder="от"
                    type="number"
                    value={filterPrice[0]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (
                        filterPrice[1] > +e.target.value &&
                        +e.target.value >= 0
                      )
                        setFilterPrice([+e.target.value, filterPrice[1]]);
                    }}
                  />
                  <Input
                    placeholder="до"
                    type="number"
                    value={filterPrice[1]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (
                        filterPrice[0] < +e.target.value &&
                        +e.target.value <= maxPrice
                      )
                        setFilterPrice([filterPrice[0], +e.target.value]);
                    }}
                  />
                </div>
              </div>
            </div>

            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Выберете нужные категории"
              onChange={(value: Array<string>) => setSelectCategories(value)}
            >
              {productGroup.map((item: any, index: number) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Button className="filter__accept" type="primary" onClick={() => applyFilter(filterPrice,selectCategories)}>Применить</Button>
          
            {/* <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  
                  onChange={(e) => console.log(e, 'VAall')}
                  onValuesChange={(val) => console.log(val)}
                >
                  {productGroup?.map((item: any, index: number) => (
                    // <Menu.Item key={item.id}>
                       <Form.Item name={item.name}    valuePropName="checked">
                         
                         <Checkbox>{item.name}</Checkbox>
                      </Form.Item>
                    // </Menu.Item>
                  ))}
                </Form> */}
          </Sider>

          <Layout style={{ padding: "0 24px" }} className="layoutContent">
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <div className="shop-cards">
                {productsList?.map((item: any, index: number) => {
                  
                  return (
                    <ShopCard
                      key={item.id}
                      setIsModalVisible={setIsModalVisible}
                      setCurrentCard={setCurrentCard}
                      images={item.images}
                      id={item.id}
                      name={item.name}
                      price={item.buyPrice}
                      content={item}
                      rate={
                        item.rate
                      }
                    />
                  );
                })}
              </div>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          FeoFish ©2021 Created by Persovt
        </Footer>
      </Layout>
    </div>
  );
}
export async function getStaticProps() {
  // const data = await Promise.all([
  //   fetch(
  //     "https://fancrm.retailcrm.ru/api/v5/store/products?apiKey=wEdfH8sQ8VyugnjbuGPfDhKyhfjBINz8"
  //   ).then((res) => res.json()),
  //   fetch(
  //     "https://fancrm.retailcrm.ru/api/v5/store/product-groups?apiKey=wEdfH8sQ8VyugnjbuGPfDhKyhfjBINz8"
  //   ).then((res) => res.json()),
  // ]);

  const data: any = await Promise.all([
    axios("http://localhost:3000/api/moysklad/getProducts").then(
      ({ data }) => data.data
    ),
    axios("http://localhost:3000/api/moysklad/getFolder").then(
      ({ data }) => data.data
    ),
  ]);

  const [products, productGroup]: any = data;

  // // const data2 = await fetch(
  // //   "https://fancrm.retailcrm.ru/api/v5/store/products?apiKey=wEdfH8sQ8VyugnjbuGPfDhKyhfjBINz8"
  // // ).then(res=>res.json())

  // if (!products || !productGroup) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      products: products.products,
      productGroup: productGroup,

      maxPrice: products.maxPrice,
    }, // will be passed to the page component as props
  };
}

export default Shop;
