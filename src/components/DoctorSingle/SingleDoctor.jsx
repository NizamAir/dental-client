import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import style from "./style.module.scss";

export default function SingleDoctor() {
  const location = useLocation();
  // console.log("location", location);
  const doctor = location.state;
  const lastReview =
    location.state.reviews.length === 0 ? null : location.state.reviews.at(-1);

  // console.log("doctor", doctor.education.split(" "));

  return (
    <section className={style.section}>
      <div className={style.card} key={doctor.id}>
        <img src={`http://localhost:5288/images/${doctor.doctor.imageName}`} />
        <h2 className={style.card__title}>
          {doctor.doctor.lastName} {doctor.doctor.firstName}{" "}
          {doctor.doctor.fatherName}
        </h2>
        <p className={style.card__text}> {doctor.doctor.specialization} </p>
        <p className={style.card__text}>
          стаж более {doctor.doctor.workExperience} лет
        </p>
      </div>
      <div className={style.content}>
        <div>
          <h3 className={style.content__title}>Общая информация</h3>
          <p className={style.content__text}>
            {doctor.doctor.specialization}{" "}
            <strong>
              {doctor.doctor.lastName} {doctor.doctor.firstName}{" "}
              {doctor.doctor.fatherName}
            </strong>
          </p>
        </div>
        <div>
          <p className={style.content__text}>
            Опыт работы более <strong>{doctor.doctor.workExperience} </strong>{" "}
            лет
          </p>
          <p className={style.content__text}>
            Сертификат специалиста по специальности «Стоматология
            терапевтическая» 0121241871112 от 01.07.2019 г. Сроком на 5 лет
          </p>
        </div>
        <div>
          <h3 className={style.content__title}>Образование</h3>
          <p className={style.content__text}>{doctor.doctor.education}</p>
        </div>
        <div>
          <h3 className={style.content__title}>Награды:</h3>
          <p className={style.content__text}>
            Почетная грамота “За многолетний добросовестный труд, высокий
            профессионализм и в связи с празднованием Международного дня
            стоматолога”, выдана Ассоциацией стоматологов Чувашской Республики,
            2019 год
          </p>
        </div>
        <div>
          <h3 className={style.content__title}>Повышение квалификации</h3>
          <p className={style.content__text}>
            АУ Чувашии «Институт усовершенствования врачей», 11.10.2014г.,
            «Стоматология терапевтическая» ФГБОУВО «Чувашский государственный
            университет имени И.Н.Ульянова», 29.06.2019г, «Актуальные вопросы
            стоматологии терапевтической»
          </p>
        </div>
        <div>
          <h3 className={style.content__title}>Семинары</h3>
          <p className={style.content__text}>
            Региональный Клинический Учебный Центр г.Нижний Новгород , 2008г.{" "}
            <br />
            «Изготовление прямого винира, закрытие трем, диастем, алгоритм
            работы при создании эстетически функциональных реставраций передней
            группы зубов» МАСИ Рокада-Мед г.Казань 15.10.2012г. <br />{" "}
            «Клиническая эндодонтия. Современные методы обтурации системы
            корневых каналов» МАСИ Рокада-Мед г.Казань 1-2.06.2016г. <br />{" "}
            «Успех прямой реставрации. Подходы и возможности.» МАСИ Рокада-Мед
            г.Казань 23.08.2017г. <br />
            «Секреты успешной реставрации фронтальной группы зубов с
            использованием современных методик, материалов и инструментов»
            S.T.Dent. Курс А.Болячина, г.Нижний Новгород, 17.02.2018 г. <br />
            «Перелечивание «Перелечиваний». Продвинутый курс по повторному
            эндодонтическому лечению» S.T.Dent., Семинар Дениса Крутикова
            «Прямая реставрация фронтальной группы зубов. Просто о сложном»,
            г.Нижний Новгород, 10-11.11.2018 г.
          </p>
        </div>
        <div>
          <h3 className={style.content__title}>Последний отзыв</h3>
          {lastReview === null ? (
            <p className={style.content__text}>Нет отзывов</p>
          ) : (
            <div className={style.content__review}>
              <div className={style.review__wrapper}>
                <p className={style.review__title}>
                  <span>{lastReview.clientName}</span>
                  {Array.from({ length: lastReview.starsCount }, (_, index) => {
                    return <MdOutlineStar color="#ffcc00" key={index} />;
                  })}
                  {Array.from(
                    { length: 5 - lastReview.starsCount },
                    (_, index) => {
                      return (
                        <MdOutlineStarBorder color="#ffcc00" key={index} />
                      );
                    }
                  )}
                </p>
                <div className={style.review__desc}>{lastReview.comment}</div>
                <p className={style.review__date}>
                  {lastReview.creationDate} {lastReview.creationTime}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
