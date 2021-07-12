import React from "react";
import { Card, Rate } from "antd";
import { Carousel, Skeleton } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const { Meta } = Card;
interface shopCard {
  setIsModalVisible: Function;
  images: Array<string>;
  setCurrentCard: Function;
  id: number;
  name: string;
  price: number;
  content: Object;
  rate: number;
}
const shopCard = ({
  setIsModalVisible,
  images,
  setCurrentCard,
  id,
  name,
  price,
  content,
  rate,
}: shopCard) => {
  return (
    <div className="card">
      <Carousel autoplay>
        <div className="image">
          {images.length ? (
            images.map((item: any) => (
              <img alt="example" src={item} key={item} />
            ))
          ) : (
            <Skeleton.Image
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </div>
      </Carousel>

      <div className="card__name">{name}</div>
      <div className="card__row">
        <Rate
          allowHalf
          defaultValue={rate}
          style={{ margin: "10px" }}
          disabled
        />
        <div className="card__price">{price}₽</div>
      </div>

      <div
        className="toProduct"
        onClick={() => {
          setIsModalVisible(true);
          setCurrentCard(content);
        }}
      >
        Купить
      </div>
    </div>
  );
};
export default shopCard;
//"https://b2b-postavki.ru/foto/JP/krevetki.jpg"
