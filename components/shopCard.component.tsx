import React from "react";
import { Card, Rate } from "antd";
const { Meta } = Card;
interface shopCard {
  setIsModalVisible: Function;
  imageUrl: string;
  setCurrentCard: Function;
  id: number;
  name: string;
  price: number;
  content: Object
}
const shopCard = ({
  setIsModalVisible,
  imageUrl,
  setCurrentCard,
  id,
  name,
  price,
  content
}: shopCard) => {
  return (
    <div className="card">
      <div className="image">
        <img alt="example" src={imageUrl} />
      </div>
      <div className="card__name">{name}</div>
      <div className="card__row">
        <Rate allowHalf defaultValue={5} style={{ margin: "10px" }} disabled />
        <div className="card__price">{price}₽</div>
      </div>

      <div
        className="toProduct"
        onClick={() => {
          setIsModalVisible(true);
          setCurrentCard(content);
        }}
      >
        Добавить в корзину
      </div>
    </div>
  );
};
export default shopCard;
//"https://b2b-postavki.ru/foto/JP/krevetki.jpg"
