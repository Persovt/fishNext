import React, { ReactElement, useState } from "react";
import {
  Modal,
  Button,
  Rate,
  Radio,
  Input,
  List,
  Avatar,
  RadioChangeEvent,
  Slider,
  Carousel,
} from "antd";
import { Skeleton } from "antd";
import axios from "axios";

const { TextArea } = Input;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
];

interface modal {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  currentCard: any;
  addProductCart: Function;
}
const modal = ({
  isModalVisible,
  setIsModalVisible,
  currentCard,
  addProductCart,
}: modal): ReactElement => {
  const [openMoreComment, setOpenMoreComment] = useState<boolean>(false);
  const [currectIndexProduct, setCurrectIndexProduct] = useState<number>(0);
  const [currectOffer, setCurrectOffer] = useState<any>({});
  const [commnets, setComments] = useState<any>([]);
  const [allVariant, setAllVariant] = useState<any>([]);

  console.log(currentCard, "currentCard");

  const closeCart = (
    setIsModalVisible: Function,
    setAllVariant: Function,
    setCurrectOffer: Function,
    setCurrectIndexProduct: Function
  ) => {
    setIsModalVisible(false);
    setAllVariant([]);
    setCurrectOffer({});
    setCurrectIndexProduct(0);
  };

  React.useEffect(() => {
    if (currentCard.id) {
      fetch(
        "http://localhost:3000/api/moysklad/getVariant?idProduct=" +
          currentCard.id
      )
        .then((res) => res.json())
        .then((variants) => {
          setAllVariant(variants.data.variants);
          if (variants.data.variants.length)
            setCurrectOffer(variants.data.variants[currectIndexProduct]);
          setComments(variants.data.comment);
        });
      console.log(currectOffer, "currectOffer");
    }
  }, currentCard.id);
  // React.useEffect(() => {
  //   setCurrectIndexProduct(0);

  //   if (currentCard.offers) {
  //     setCurrectOffer(currentCard?.offers[0]);
  //   }
  // }, [currentCard.offers]);
  console.log(
    allVariant,
    "allVariantallVariantallVariantallVariantallVariantallVariant"
  );
  if (currectOffer.id)
    return (
      <>
        <Modal
          title={
            //The main implementation code can pass in an html structure component here is also possible
            [
              <div>
                <span>{currentCard.name}</span>
                <Rate
                  allowHalf
                  value={currentCard.rate}
                  defaultValue={currentCard.rate}
                  style={{ marginLeft: "25px" }}
                  disabled
                />
              </div>,
            ]
          }
          // title="<Rate allowHalf defaultValue={2.5} />"
          visible={isModalVisible}
          onOk={() => {
            addProductCart(currectOffer);
            closeCart(
              setIsModalVisible,
              setAllVariant,
              setCurrectOffer,
              setCurrectIndexProduct
            );
          }}
          cancelButtonProps={{ style: { display: "none" } }}
          onCancel={() =>
            closeCart(
              setIsModalVisible,
              setAllVariant,
              setCurrectOffer,
              setCurrectIndexProduct
            )
          }
          okText="Добавить в карзину"
          cancelText="Отменить"
          className="cardModal"
          // cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="modal">
            {currectOffer.images.length ? (
              <Carousel autoplay>
                {currectOffer.images.map((item: any, index: number) => (
                  <div className="modal__img" key={item}>
                    <img alt="example" src={item} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="modal__img">
                <Skeleton.Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}

            <div className="modal__content">
              <div className="modal__description">
                {currectOffer.description}
              </div>
              <div className="modal__select-type">
                {/*
                todo: При выборе другой карты id radio остается старым FIIIIX
                 */}
                <Radio.Group
                  defaultValue={0}
                  value={currectIndexProduct}
                  buttonStyle="solid"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onChange={(e: RadioChangeEvent) => {
                    setCurrectIndexProduct(e.target.value);
                    setCurrectOffer(allVariant[e.target.value]);
                  }}
                >
                  {allVariant.map((item: any, index: number) => (
                    <Radio.Button
                      style={{ height: "auto" }}
                      value={index}
                      key={item.id}
                    >
                      {item.name}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
              <div className="modal__comment">
                <div className="modal__comment-title">Отзывы:</div>
                <List
                  className={
                    openMoreComment
                      ? "modal__commnet-list more-comment"
                      : "modal__commnet-list"
                  }
                  itemLayout="horizontal"
                  dataSource={commnets}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={
                          <>
                           <span>{item.title}</span>
                            <Rate
                              disabled
                              allowHalf
                              defaultValue={item.rate}
                              // style={{ marginLeft: "25px" }}
                            />
                          </>
                        }
                        description={item.content}
                      />
                    </List.Item>
                  )}
                />
                <div
                  className="modal__comment-more"
                  onClick={() => setOpenMoreComment(!openMoreComment)}
                >
                  {openMoreComment ? "Скрыть" : "Показать больше"}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  else return <></>;
};
export default modal;
