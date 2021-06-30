import Head from "next/head";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import Fish from "../img/fish.svg";
import Redirect from "../utils/redirect";
import { useRouter } from "next/router";
import TankFishJs from "../components/tank";
import PathComponent from "../components/path";
export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img className="mover" src="static/delivery.png" />
      {/* <Image className="mover"  src={Delivery} alt="Picture of the author" width='256' height='256' layout='fixed' /> */}
      <PathComponent />

      <section className="welcome">
        <div
          className="tank"
          ref={(ref: any) => {
            TankFishJs(ref);
          }}
        ></div>
        <div className="welcome__ciricle">
        <div className="welcome__content">
          <h1 className="welcome__title">FEOFISH</h1>
          <Image
            className="about__img"
            src={Fish}
            alt="Shop"
            width="256"
            height="256"
          />
          <button className="btn__buy" onClick={() => router.push("/shop")}>
            Перейти в магазин.
          </button>
        </div>
        </div>
        
        <div
          className="next-block"
          onClick={() => (window.location.href = "#about")}
        >
          <span className="arrow">О нас</span>
        </div>
        {/* <div className="welcome__shop">
         
          <button className="btn__buy">Купить</button>
        </div> */}
      </section>
      <section className="about-first path-sec" id="about">
        <div className="split">
          <div className="about bubble-right">
            <h2 className="about__text">О нас</h2>
            <p className="about__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              accusantium, voluptatem tenetur tempora placeat voluptates sed
              commodi praesentium adipisci. Sit porro quidem accusamus ad
              laborum laboriosam odio dignissimos praesentium. Harum. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              officiis atque nam hic et aliquam voluptatum saepe reprehenderit!
              Similique laboriosam quam cupiditate, odio fugiat velit commodi
              consectetur! Commodi, ut dolores?
            </p>
            {/* <Image
              className="about__img"
              src={socialShare}
              alt="Picture of the author"
              width="256"
              height='256'
            /> */}
            <img src="static/social_share.svg" className="about__img" alt="" />
          </div>
          <div className="way">
            <div className="ciricle ">
              {/* <Image
                className="ciricle__image"
                src={Sea}
                alt="Picture of the author"
                width="256"
                height="256"
              /> */}
              <img src="static/sea.svg" className="ciricle__image" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="about-second path-sec">
        <div className="split">
          <div className="way">
            <div className="ciricle">
              {/* <Image
                className="ciricle__image"
                src={shops}
                alt="Picture of the author"
                width="256"
                height="256"
              /> */}
              <img src="static/shops.svg" className="ciricle__image" alt="" />
            </div>
          </div>
          <div className="about bubble-left">
            <h2 className="about__text"> Почему именно мы?</h2>
            <p className="about__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              accusantium, voluptatem tenetur tempora placeat voluptates sed
              commodi praesentium adipisci. Sit porro quidem accusamus ad
              laborum laboriosam odio dignissimos praesentium. Harum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Adipisci fugiat
              optio a quia consequuntur voluptatem consequatur quod accusamus.
              Harum quae tempora unde eos magnam accusamus, quam voluptas et
              officiis amet.
            </p>
            {/* <Image
              className="about__img"
              src={connected}
              alt="Picture of the author"
              width="256"
              height="256"
            /> */}
            <img src="static/connected.svg" className="about__img" alt="" />
          </div>
        </div>
      </section>
      <section className="delivery path-sec">
        <div className="split">
          <div className="about bubble-right">
            <h2 className="about__text">Доставка</h2>
            {/* <p className="about__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              accusantium, voluptatem tenetur tempora placeat voluptates sed
              commodi praesentium adipisci. Sit porro quidem accusamus ad
              laborum laboriosam odio dignissimos praesentium. Harum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Totam
              necessitatibus tempore veritatis, dolores eum suscipit ipsa itaque
              fugit ea maiores beatae delectus eaque laboriosam voluptatum
              cupiditate corrupti. Assumenda, rerum culpa.
            </p> */}
            {/* <Image
              className="about__img"
              src={deliveryBike}
              alt="Picture of the author"
              width="256"
              height="256"
            /> */}
            {/* <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ace68517423ebe0f7a74e9169cdbecc57a9f2863c9049da2f71567b344c0d80e0&amp;source=constructor"
              width="497"
              height="446"
              frameBorder="0"
              style={{
                borderRadius: "25px",
              }}
            ></iframe> */}

            {/* <img src="static/delivery-bike.svg" className="about__img" alt="" /> */}
          </div>
          <div className="way">
            <div className="ciricle">
              {/* <Image
                className="ciricle__image"
                src={house}
                alt="Picture of the author"
                width="256"
                height="256"
              /> */}
              <img src="static/house.svg" className="ciricle__image" alt="" />
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrapper">
          <div className="row space-between">
            <div className="footer-box">
              <div className="footer-title">Информация</div>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="" className="footer-link">
                    О нас
                  </a>
                </li>
                <li className="footer-item">
                  <a href="" className="footer-link">
                    Доставка и оплата
                  </a>
                </li>
                <li className="footer-item">
                  <a href="" className="footer-link">
                    Наши гарантии
                  </a>
                </li>
                <li className="footer-item">
                  <a href="" className="footer-link">
                    Как сделать заказ
                  </a>
                </li>
                <li className="footer-item">
                  <a href="" className="footer-link">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-box">
              <div className="footer-title">Время работы</div>
              <div className="footer-list">
                <div className="footer-item">
                  {/* <Image
                    className="footer-timeImage"
                    src={clock}
                    alt="Picture of the author"
                    width="256"
                    height="256"
                  /> */}
                  <img
                    src="static/clock.svg"
                    alt=""
                    className="footer-timeImage"
                  />
                  <div className="footer-workTime">с 00:00 до 25:00</div>
                </div>
              </div>
            </div>
            <div className="footer-box">
              <div className="footer-title">Наши контакты</div>
              <div className="footer-list">
                <div className="footer-item">
                  <div className="footer-phone">+7 (999) 999-99-99</div>
                </div>
                <div className="footer-item">
                  <div className="footer-email">test@mail.ru</div>
                </div>
                <div className="footer-item">
                  <div className="footer-adres">
                    г.Москва, ул. Пушкина дом Калапушкина
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="footer-bottom">
              <div className="footer-bottom-credits">FEOFISH © 2021</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
