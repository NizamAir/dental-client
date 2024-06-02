import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { doctorShiftsAPI } from "../../services/DoctorShiftsService";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { PiSmileySadLight } from "react-icons/pi";

import style from "./style.module.scss";
export default function DoctorReview() {
  const [reviews, setReviews] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    doctorShiftsAPI(axiosPrivate)
      .fetchReviews()
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      });
  }, []);
  return (
    <section className={style.section}>
      <h1 className={style.title}>Отзывы клиентов</h1>
      <div className={style.content}>
        {reviews.length !== 0 ? (
          reviews.map((lastReview) => (
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
          ))
        ) : (
          <p className={style.review__title_no}>
            <span>У вас пока нет отзывов</span>
            <PiSmileySadLight size={50} />
          </p>
        )}
      </div>
    </section>
  );
}
