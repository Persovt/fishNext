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
} from "antd";
import { ChangeEvent } from "mongodb";
import { Skeleton } from "antd";

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
  const [currectOffer, setCurrectOffer] = useState<any>({
    images: [""],
  });
  React.useEffect(() => {
    setCurrectIndexProduct(0);

    if (currentCard.offers) {
      setCurrectOffer(currentCard?.offers[0]);
    }
  }, [currentCard.offers]);
  console.log(currentCard?.offers);
  if (currentCard?.offers)
    return (
      <>
        <Modal
          title={
            //The main implementation code can pass in an html structure component here is also possible
            [
              <div>
                <span> Криветка морская</span>
                <Rate
                  allowHalf
                  defaultValue={5}
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
            setIsModalVisible(false);
          }}
          cancelButtonProps={{ style: { display: "none" } }}
          onCancel={() => setIsModalVisible(false)}
          okText="Добавить в карзину"
          cancelText="Отменить"
          className="cardModal"
          // cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="modal">
            <div className="modal__img">
              <img
                src={
                  currectOffer.images.length ? (
                    currectOffer.images[0]
                  ) : (
                    <Skeleton.Image />
                  )
                }
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="modal__content">
              <div className="modal__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus sint quis molestias odit iste repellat vero eveniet
                eligendi tempore, saepe atque laudantium maxime omnis quibusdam
                facere possimus unde vitae. Magni.
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
                    setCurrectOffer(currentCard.offers[e.target.value]);
                  }}
                >
                  {currentCard?.offers?.map((item: any, index: number) => (
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
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={
                          <>
                            <a href="https://ant.design">{item.title}</a>{" "}
                            <Rate
                              disabled
                              allowHalf
                              defaultValue={2}
                              // style={{ marginLeft: "25px" }}
                            />
                          </>
                        }
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
