import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./style.module.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { reviewAPI } from "../../services/ReviewService";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineRateReview,
  MdDelete,
} from "react-icons/md";

export default function Review({ shift }) {
  const [review, setReview] = useState();
  const [stars, setStars] = useState();
  const [emptyStars, setEmptyStars] = useState();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    refreshReview();
  }, []);

  function refreshReview() {
    setReview();
    setStars();
    setEmptyStars();
    console.log("shift", shift);
    reviewAPI(axiosPrivate)
      .fetchByShiftId(shift.id)
      .then((response) => {
        console.log(response.data);
        setReview(response.data);
        setStars(response.data.starsCount);
        setEmptyStars(5 - response.data.starsCount);
      })
      .catch((error) => {
        console.log(error);
        setReview();
      });
  }

  const starsCount = Array.from({ length: stars }, (_, index) => {
    return <MdOutlineStar color="#ffcc00" key={index} />;
  });
  const emptyStarsCount = Array.from({ length: emptyStars }, (_, index) => {
    return <MdOutlineStarBorder color="#ffcc00" key={index} />;
  });

  const handleDelete = (event, id) => {
    event.preventDefault();
    if (window.confirm("Вы уверены, что хотите удалить отзыв?")) {
      console.log(id);
      reviewAPI(axiosPrivate)
        .delete(id)
        .then((response) => {
          console.log(response.data);
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      {review ? (
        <div className={style.review__wrapper}>
          <p className={style.review__title}>
            <span>Отзыв</span> {starsCount}
            {emptyStarsCount}
          </p>
          <div className={style.review__desc}>{review.comment}</div>
          <p className={style.review__date}>
            {review.creationDate} {review.creationTime}
          </p>
          <button
            onClick={(event) => handleDelete(event, review.id)}
            className={style.review__btn}
          >
            <span>Удалить</span>
            <MdDelete color="white" />
          </button>
        </div>
      ) : (
        <Link to="/reviewedit" state={shift}>
          <MdOutlineRateReview size={20} color="white" />
          Оставить отзыв
        </Link>
      )}
    </div>
  );
}
