import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { IoStarOutline } from "react-icons/io5";
import {
  PiSmileySad,
  PiSmileyAngry,
  PiSmileyMehLight,
  PiSmiley,
  PiSmileyWink,
} from "react-icons/pi";

import style from "./style.module.scss";
import { reviewAPI } from "../../services/ReviewService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function ReviewEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const shift = location.state;
  const [shiftId, setShiftId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [productName, setProductName] = useState("");
  const [mark, setMark] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
    setDoctorName(shift.doctorName);
    setProductName(shift.productName || "Услуга не выбрана");
    setShiftId(shift.id);
  }, []);

  const ratingChanged = (newRating) => {
    setMark(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      comment: comment,
      starsCount: mark,
      shiftId: shiftId,
    });

    reviewAPI(axiosPrivate)
      .create(
        JSON.stringify({
          comment: comment,
          starsCount: mark,
          shiftId: shiftId,
        })
      )
      .then((response) => navigate("/allshifts"))
      .catch((error) => console.log(error));
  };

  console.log("shift", shift);
  return (
    <>
      <section className={style.section}>
        <h1 className={style.title}>Отзыв</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.form__item}>
            <label>Врач:</label>
            <input
              type="text"
              id="doctorName"
              autoComplete="off"
              defaultValue={doctorName}
              disabled
              // onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className={style.form__item}>
            <label>Услуга:</label>
            <input
              type="text"
              id="doctorName"
              autoComplete="off"
              defaultValue={productName}
              disabled
              // onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={style.form__item}>
            <textarea
              cols={25}
              rows={5}
              placeholder="Оставьте комментарий..."
              type="text"
              id="doctorName"
              autoComplete="off"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className={style.form__item}>
            {!mark ? (
              <p>Поставьте оценку:</p>
            ) : mark === 5 ? (
              <p
                style={{
                  color: "#17a92f",
                }}
              >
                Все отлично!
              </p>
            ) : mark === 4 ? (
              <p style={{ color: "#91ff00" }}>Почти нет вопросов!</p>
            ) : mark === 3 ? (
              <p style={{ color: "#ffe600" }}>Могло быть и лучше!</p>
            ) : mark === 2 ? (
              <p style={{ color: "#ff8800" }}>Не рекомендую!</p>
            ) : (
              <p style={{ color: "#fd310d" }}>Все плохо!</p>
            )}
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={40}
              activeColor="#ffd700"
              color="white"
            />
          </div>
          <button className={style.form__btn}>Добавить</button>
        </form>
      </section>
    </>
  );
}
