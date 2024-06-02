import { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "../../api/axios";

import clientImg1 from "/img/Профгигиена.png";
import clientImg2 from "/img/slide2.jpg";
import clientImg3 from "/img/slide3.jpg";
import { NavLink } from "react-router-dom";

import phone_blue from "/phone_blue.svg";
import notebook_blue from "/notebook_blue.svg";
import list_blue from "/list_blue.svg";

import icon_1 from "/product_img/icon1.svg";
import icon_2 from "/product_img/icon2.svg";
import icon_3 from "/product_img/icon3.svg";
import icon_4 from "/product_img/icon4.svg";
import icon_5 from "/product_img/icon5.svg";
import icon_6 from "/product_img/icon6.svg";
import icon_7 from "/product_img/icon7.svg";
import icon_8 from "/product_img/icon8.svg";
import icon_9 from "/product_img/icon9.svg";
import icon_10 from "/product_img/icon10.svg";
import style from "./style.module.scss";

const icons = [
  icon_1,
  icon_2,
  icon_3,
  icon_4,
  icon_5,
  icon_6,
  icon_7,
  icon_8,
  icon_9,
  icon_10,
];

export default function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    refreshProductList();
  }, []);

  function refreshProductList() {
    axios
      .get("/products")
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const images = [
    {
      title: "Комплексная профгигиена",
      newPrice: 7990,
      oldPrice: 9900,
      description:
        "Имеются противопоказания, необходима консультация специалиста",
      imagePath: clientImg1,
    },
    {
      title: "Исправление прикуса",
      newPrice: 19000,
      oldPrice: 25000,
      description:
        "Имеются противопоказания, необходима консультация специалиста",
      imagePath: clientImg2,
    },
    {
      title: "Лечение зубов во сне",
      newPrice: 15900,
      oldPrice: 21900,
      description:
        "Имеются противопоказания, необходима консультация специалиста",
      imagePath: clientImg3,
    },
  ];
  return (
    <>
      <div className={style.mobile_vers}>
        <div className={style.slider__info_desc}>
          <h1 className={style.slider__info_desc_title}>{images[0].title}</h1>
          <p className={style.slider__info_desc_text}>
            {images[0].description}
          </p>
          <button className={style.slider__info_desc_btn}>
            <NavLink to="/usershift">Записаться на приём</NavLink>
          </button>
        </div>
        <div className={style.mobile_vers_price}>
          <p className={style.mobile_vers_price_old}>{images[0].oldPrice} p</p>
          <p className={style.mobile_vers_price_new}>{images[0].newPrice} p</p>
        </div>
      </div>
      <div className={style.slider}>
        <Slide>
          {images.map((image, index) => (
            <div key={index} className={style.slider__info}>
              <div className={style.slider__info_desc}>
                <h1 className={style.slider__info_desc_title}>{image.title}</h1>
                <p className={style.slider__info_desc_text}>
                  {image.description}
                </p>
                <button className={style.slider__info_desc_btn}>
                  <NavLink to="/usershift">Записаться на приём</NavLink>
                </button>
              </div>
              <div className={style.img_block}>
                <div className={style.img_block_price}>
                  <p className={style.img_block_price_old}>
                    {image.oldPrice} p
                  </p>
                  <p className={style.img_block_price_new}>
                    {image.newPrice} p
                  </p>
                </div>
                <img src={image.imagePath} className={style.img_block_img} />
              </div>
            </div>
          ))}
        </Slide>
      </div>
      <div className={style.wrapper}>
        <div className={style.wrapper_info}>
          <h2 className={style.wrapper_info__title}>Мы экономим ваши деньги</h2>
          <div className={style.info}>
            <div className={style.info__item}>
              <img className={style.info__item_img} src={phone_blue} />
              <p className={style.info__item_title}>Стоимость фиксирована</p>
              <p className={style.info__item_text}>
                Окончательную цену узнаете на консультации. Любые изменения
                будут обсуждены с вами.
              </p>
            </div>
            <div className={style.info__item}>
              <img className={style.info__item_img} src={notebook_blue} />
              <p className={style.info__item_title}>Без лишних услуг</p>
              <p className={style.info__item_text}>
                В стоимость входят лечение, материалы, все необходимые затраты.
              </p>
            </div>
            <div className={style.info__item}>
              <img className={style.info__item_img} src={list_blue} />
              <p className={style.info__item_title}>Договор оказания услуг</p>
              <p className={style.info__item_text}>
                Фиксируем собственную ответственность и обязательства.
              </p>
            </div>
          </div>
        </div>

        <div className={style.wrapper_info}>
          <h2 className={style.wrapper_info__title}>Наши услуги</h2>
          <div className={style.products}>
            {productList.map((product, index) => (
              <div key={product.id} className={style.products_item}>
                <img className={style.products_item__img} src={icons[index]} />
                <h3 className={style.products_item__title}>{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
