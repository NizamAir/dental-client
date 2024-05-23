import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import style from "./style.module.scss";

import clientImg1 from "/img/Профгигиена.png";
import clientImg2 from "/img/slide2.jpg";
import clientImg3 from "/img/slide3.jpg";
import { NavLink } from "react-router-dom";

// const indicators = (index) => <div className={style.indicator}></div>;

export default function Home() {
  const images = [
    {
      title: "Комплексная профгигиена",
      newPrice: 2600,
      oldPrice: 5200,
      description:
        "Имеются противопоказания, необходима консультация специалиста",
      imagePath: clientImg1,
    },
    {
      title: "Исправление прикуса",
      newPrice: 12600,
      oldPrice: 15200,
      description:
        "Имеются противопоказания, необходима консультация специалиста",
      imagePath: clientImg2,
    },
    {
      title: "Лечение зубов во сне",
      newPrice: 17500,
      oldPrice: 21900,
      description:
        "Имеются противопоказания, необходима консультация специалиста",
      imagePath: clientImg3,
    },
  ];
  return (
    <div className={style.wrapper}>
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
              <div className={style.slider__info_desc_price}>
                <p className={style.slider__info_desc_price_old}>
                  {image.oldPrice} p
                </p>
                <p className={style.slider__info_desc_price_new}>
                  {image.newPrice} p
                </p>
              </div>
            </div>

            <img src={image.imagePath} />
            {/* <div style={{ backgroundImage: `url(${image})` }}></div> */}
          </div>
        ))}
      </Slide>
    </div>
  );
}
